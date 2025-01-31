import path from 'path';

export function getSourcePath(
  clientOutput: string,
  overrideTarget?: string,
  schemaTarget?: string
) {
  if (overrideTarget) {
    if (path.isAbsolute(overrideTarget)) {
      // importable
      return require.resolve(overrideTarget);
    }

    // schema relative
    return path.resolve(
      // schemaTarget is the full path of the Prisma schema - we need the directory
      path.dirname(schemaTarget!),
      overrideTarget,
      overrideTarget.endsWith('.d.ts') ? '' : 'index.d.ts'
    );
  }

  return path.resolve(
    // prisma client directory
    path.dirname(
      // We cannot directly resolve .prisma/client because pnpm uses a different directory structure,
      // so we find @prisma/client path and resolve the parent directory
      require.resolve(path.resolve(clientOutput, '../../.prisma/client'))
    ),
    'index.d.ts'
  );
}
