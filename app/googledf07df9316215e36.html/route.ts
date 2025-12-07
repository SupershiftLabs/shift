export async function GET() {
  return new Response('google-site-verification: googledf07df9316215e36.html', {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  })
}
