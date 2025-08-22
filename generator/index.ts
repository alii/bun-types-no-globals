import { $ } from 'bun';
import * as fsp from 'node:fs/promises';
import * as path from 'node:path';
import { Node, parseSync } from 'oxc-parser';
import { walk } from 'oxc-walker';
import { tempDirWithFiles } from './fs';

using tempDir = tempDirWithFiles('bun-types-no-globals-generator', {
	'package.json': JSON.stringify({
		name: 'temp',
		version: '1.0.0',
		dependencies: {
			'@types/bun': 'latest',
		},
	}),
});

const outputDir = path.join(import.meta.dirname, '..', 'lib');

await $.cwd(tempDir.path)`bun install`;

await fsp.mkdir(outputDir, { recursive: true });

for await (const filePath of new Bun.Glob('node_modules/bun-types/**/*.d.ts').scan({
	cwd: tempDir.path,
})) {
	console.log();
	console.log('processing', filePath);

	const fullPath = path.join(tempDir.path, filePath);

	const file = Bun.file(fullPath);
	const ast = parseSync(file.name ?? filePath, await file.text(), { astType: 'ts' });

	let hasTopLevelImportsOrExports = false;
	let hasModuleDeclarations = false;
	let hasTripleSlashReferences = false;

	if (ast.comments) {
		for (const comment of ast.comments) {
			if (comment.type === 'Line' && comment.value?.includes('<reference')) {
				hasTripleSlashReferences = true;
				break;
			}
		}
	}

	for (const node of ast.program.body) {
		if (
			node.type === 'ImportDeclaration' ||
			node.type === 'ExportNamedDeclaration' ||
			node.type === 'ExportDefaultDeclaration' ||
			node.type === 'ExportAllDeclaration'
		) {
			hasTopLevelImportsOrExports = true;
		}

		if (node.type === 'TSModuleDeclaration' && node.kind === 'module') {
			hasModuleDeclarations = true;
		}
	}

	if (!hasTopLevelImportsOrExports && !hasModuleDeclarations && !hasTripleSlashReferences) {
		console.log('skipping pure global script file');
		continue;
	}

	const outputFile = path.join(
		outputDir,
		path.relative(path.join(tempDir.path, 'node_modules/bun-types'), fullPath)
	);

	const nodesToRemove = new Set<Node>();

	walk(ast.program, {
		enter: (node, parent) => {
			if (node.type === 'TSModuleDeclaration' && node.kind === 'global') {
				nodesToRemove.add(node);
				return;
			}

			if (parent !== null && parent.type === 'Program') {
				if (node.type === 'TSModuleDeclaration') {
					if (node.kind === 'namespace' || (node.id && node.id.type === 'Identifier')) {
						nodesToRemove.add(node);
					}
					return;
				}

				if (
					node.type !== 'ExportNamedDeclaration' &&
					node.type !== 'ExportDefaultDeclaration' &&
					node.type !== 'ExportAllDeclaration' &&
					node.type !== 'ImportDeclaration' &&
					node.type !== 'Program'
				) {
					nodesToRemove.add(node);
				}
			}
		},
	});

	await fsp.mkdir(path.dirname(outputFile), { recursive: true });

	if (nodesToRemove.size > 0) {
		const filteredBody = ast.program.body.filter(node => !nodesToRemove.has(node));

		if (filteredBody.length > 0 || hasTripleSlashReferences) {
			const originalText = await file.text();
			const lines = originalText.split('\n');
			const outputLines: string[] = [];
			const addedLines = new Set<number>();

			if (hasTripleSlashReferences) {
				for (let i = 0; i < lines.length; i++) {
					const line = lines[i];

					if (line?.trim().startsWith('///') || line?.trim().startsWith('//')) {
						outputLines.push(line);
						addedLines.add(i);
					}
				}
			}

			for (const node of filteredBody) {
				const startLine = originalText.substring(0, node.start).split('\n').length - 1;
				const endLine = originalText.substring(0, node.end).split('\n').length - 1;

				for (let i = startLine; i <= endLine; i++) {
					if (!addedLines.has(i)) {
						const line = lines[i];
						if (line !== undefined) {
							outputLines.push(line);
							addedLines.add(i);
						}
					}
				}
			}

			await fsp.writeFile(outputFile, outputLines.join('\n'));
			console.log('filtered globals from', path.relative(tempDir.path, outputFile));
		} else {
			await fsp.copyFile(fullPath, outputFile);
			console.log('removed all globals from', path.relative(tempDir.path, outputFile));
		}
	} else {
		await fsp.copyFile(fullPath, outputFile);
		console.log('copied (no globals)');
	}
}
