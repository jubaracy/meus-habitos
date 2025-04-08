export function formatarData(data) {
  return data.toISOString().split('T')[0];
}