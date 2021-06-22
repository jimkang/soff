export function serve({ rootDir = '.', serveDir = '.', port }) {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        require('child_process').spawn(
          `${rootDir}/node_modules/.bin/sirv`,
          [serveDir, '--host', '0.0.0.0', '--dev', '--verbose', '--port', port],
          {
            stdio: ['ignore', 'inherit', 'inherit'],
            shell: true,
          }
        );
      }
    },
  };
}
