# AWS Devops API Application

1) Make sure you have access to the `awsdevops/api-dev` and `awsdevops/mysql-dev` development images

2) Pull down the images

3) Pull down this repo

4) Inside the repo run...

```bash
$ docker-compose run api yarn
```
... to install dependencies

5) To up the development environment run:

```bash
$ docker-compose up -d
```

And then you can navigate to `localhost:3002/explorer` to see the app.