export const redirectPage = (url: string) => {
  // svelte router 경로 내 #에 대한 처리
  document.location.href = `#${url}`
}