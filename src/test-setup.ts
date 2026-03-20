import 'zone.js';
import 'zone.js/testing';

import { ɵresolveComponentResources as resolveComponentResources } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { beforeEach } from 'vitest';

const templateResources = import.meta.glob('./app/**/*.html', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const styleResources = import.meta.glob('./app/**/*.css', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const componentResources = {
  ...templateResources,
  ...styleResources,
};

function normalizeResourceUrl(url: string): string {
  return url.replace(/[?#].*$/, '').replace(/^\.\//, '').replace(/\\/g, '/');
}

function resolveTestResource(url: string): Promise<string> {
  const normalizedUrl = normalizeResourceUrl(url);
  const matchingResource = Object.entries(componentResources).find(([resourcePath]) => {
    const normalizedPath = normalizeResourceUrl(resourcePath);
    return normalizedPath === normalizedUrl || normalizedPath.endsWith(`/${normalizedUrl}`);
  });

  if (!matchingResource) {
    return Promise.reject(new Error(`Unable to resolve Angular test resource: ${url}`));
  }

  return Promise.resolve(matchingResource[1]);
}

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

beforeEach(async () => {
  await resolveComponentResources(resolveTestResource);
});
