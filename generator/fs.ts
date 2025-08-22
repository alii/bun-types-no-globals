import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

export class TempDir implements Disposable {
	public readonly path: string;

	public constructor(path: string) {
		this.path = path;
	}

	[Symbol.dispose]() {
		fs.rmSync(this.path, { recursive: true });
	}
}

export interface DirectoryFileTree {
	[key: string]: string | DirectoryFileTree;
}

function writeDirectoryFileTree(dir: string, tree: DirectoryFileTree) {
	fs.mkdirSync(dir, { recursive: true });

	for (const [name, content] of Object.entries(tree)) {
		const fullPath = path.join(dir, name);
		if (typeof content === 'string') {
			fs.writeFileSync(fullPath, content);
		} else {
			writeDirectoryFileTree(fullPath, content);
		}
	}
}

export function tempDirWithFiles(prefix: string, files: DirectoryFileTree): TempDir {
	const dir = new TempDir(path.join(os.tmpdir(), prefix));
	writeDirectoryFileTree(dir.path, files);
	return dir;
}
