server {
        listen 80;
        listen [::]:80;

        root /home/jamie/www/hw03/build;

        index index.html;

        server_name hw03.jamiekuesel.com www.hw03.jamiekuesel.com;

        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                try_files $uri $uri/ =404;
        }
}
