import { join } from 'node:path';
import type { ExecaSyncReturnValue, SyncOptions } from 'execa';
import { execaCommandSync } from 'execa';
import fs from 'fs-extra';
import { afterEach, beforeAll, expect, test } from 'vitest';

const CLI_PATH = join(__dirname, '..');

const projectName = 'test-app';
const genPath = join(__dirname, projectName);

const run = (args: string[], options: SyncOptions = {}): ExecaSyncReturnValue => {
  return execaCommandSync(`node ${CLI_PATH} ${args.join(' ')}`, options);
};

// Helper to create a non-empty directory
const createNonEmptyDir = () => {
  // Create the temporary directory
  fs.mkdirpSync(genPath);

  // Create a package.json file
  const pkgJson = join(genPath, 'package.json');
  fs.writeFileSync(pkgJson, '{ "foo": "bar" }');
};

beforeAll(() => fs.remove(genPath));
afterEach(() => fs.remove(genPath));

test('prompts for the project name if none supplied', () => {
  const { stdout } = run([]);
  expect(stdout).toContain('Project name:');
});

test('asks to overwrite non-empty target directory', () => {
  createNonEmptyDir();
  const { stdout } = run([projectName], { cwd: __dirname });
  expect(stdout).toContain(`Target directory "${projectName}" is not empty.`);
});

test('asks to overwrite non-empty current directory', () => {
  createNonEmptyDir();
  const { stdout } = run(['.'], { cwd: genPath });
  expect(stdout).toContain(`Current directory is not empty.`);
});
