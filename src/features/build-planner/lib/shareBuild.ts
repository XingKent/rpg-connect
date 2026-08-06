import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import type { Build } from '@/types/bg3';

export type ShareableBuild = Omit<Build, 'id' | 'createdAt' | 'updatedAt'>;

export function encodeBuildForShare(build: Build): string {
  const { id, createdAt, updatedAt, ...shareable } = build;
  void id;
  void createdAt;
  void updatedAt;
  return compressToEncodedURIComponent(JSON.stringify(shareable));
}

export function decodeSharedBuild(code: string): ShareableBuild | null {
  try {
    const json = decompressFromEncodedURIComponent(code);
    if (!json) return null;
    return JSON.parse(json) as ShareableBuild;
  } catch {
    return null;
  }
}
