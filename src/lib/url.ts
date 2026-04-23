const RAW = import.meta.env.BASE_URL || '/';
const BASE = RAW.endsWith('/') ? RAW : RAW + '/';

export function url(path = ''): string {
  return BASE + path.replace(/^\//, '');
}
