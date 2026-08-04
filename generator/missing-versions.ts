const after = process.argv[2];

if (!after) {
	throw new Error('Usage: bun run generator/missing-versions.ts <version>');
}

async function versionsOf(pkg: string): Promise<string[]> {
	const res = await fetch(`https://registry.npmjs.org/${pkg}`, {
		headers: { accept: 'application/vnd.npm.install-v1+json' },
	});

	if (!res.ok) {
		throw new Error(`Failed to fetch ${pkg} from npm: ${res.status} ${res.statusText}`);
	}

	const body = (await res.json()) as { versions?: Record<string, unknown> };
	return Object.keys(body.versions ?? {});
}

const [upstream, ours] = await Promise.all([
	versionsOf('bun-types'),
	versionsOf('bun-types-no-globals'),
]);

const published = new Set(ours);

const missing = upstream
	.filter(version => !published.has(version))
	.filter(version => Bun.semver.order(version, after) > 0)
	.sort(Bun.semver.order);

for (const version of missing) {
	console.log(version);
}
