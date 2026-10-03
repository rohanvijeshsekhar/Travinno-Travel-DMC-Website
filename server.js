const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;
const socket = process.env.LSNODE_SOCKET;

// Initialize Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  });

  server.once('error', (err) => {
    console.error(err);
    process.exit(1);
  });

  if (socket) {
    server.listen(socket, () => {
      console.log(`> Next.js SSR Server Ready on UNIX socket ${socket}`);
    });
  } else {
    server.listen(port, () => {
      console.log(`> Next.js SSR Server Ready on http://localhost:${port}`);
    });
  }
});
