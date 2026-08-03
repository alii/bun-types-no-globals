/**
 * Prints the bun-types versions that this package has NOT yet published to npm,
 * oldest first, one per line.
 *
 * Flags:
 *   --from <version>   only consider versions strictly newer than this (default: BASELINE)
 *   --canary           include prerelease/canary versions (default: stable only)
 */

/** The first version this project ever shipped. Nothing older is worth backfilling. */
const BASELINE = '1.3.1';

const UPSTREAM = 'bun-types';
const OURS = 'bun-types-no-globals';

const args = process.argv.slice(2);
const includeCanary = args.includes('--canary');
const fromIndex = args.indexOf('--from');
const from = fromIndex === -1 ? BASELINE : (args[fromIndex + 1] ?? BASELINE);

async function versionsOf(pkg: string): Promise<string[]> {
	const res = await fetch(`https://registry.npmjs.org/${pkg}`, {
		headers: { accept: 'application/vnd.npm.install-v1+json' },
	});

	if (res.status === 404) {
		return [];
	}

	if (!res.ok) {
		throw new Error(`Failed to fetch ${pkg} from npm: ${res.status} ${res.statusText}`);
	}

	const body = (await res.json()) as { versions?: Record<string, unknown> };
	return Object.keys(body.versions ?? {});
}

const [upstream, ours] = await Promise.all([versionsOf(UPSTREAM), versionsOf(OURS)]);
const published = new Set(ours);

const isStable = (version: string) => /^\d+\.\d+\.\d+$/.test(version);

const missing = upstream
	.filter(version => !published.has(version))
	.filter(version => includeCanary || isStable(version))
	.filter(version => Bun.semver.order(version, from) > 0)
	.sort(Bun.semver.order);

for (const version of missing) {
	console.log(version);
}
