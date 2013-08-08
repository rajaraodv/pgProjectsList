<h1>A Node.js app that ports the <a href='http://angularjs.org/#mongolab-js' target='_blank'>AngularJS Projects app</a> to use Postgres backend(instead of MongoDB)</h1>

<p align="center">
<span style='align:left'> <img src="https://raw.github.com/rajaraodv/pgProjectsList/master/gitImgs/appImg0.png" height="250px" width="350px" /></span><span style='align:left'>
<img src="https://raw.github.com/rajaraodv/pgProjectsList/master/gitImgs/appImg1.png" height="250px" width="350px" /></span>
</p>

#### Running it locally ####
* Clone the app to `pgProjectsList` folder
* `cd pgProjectsList` folder
* `npm install`
* `node app.js`
* open browser at `localhost:3000`


#### Running it on Cloud Foundry ####

* Clone the app to `pgProjectsList` folder
* `cd pgProjectsList` folder
* `npm install`

```
> cf push
Using manifest file manifest.yml

Creating projects... OK

1: projects
2: none
Subdomain> projects

1: yourdomain.com
2: none
Domain> yourdomain.com

Binding projects.yourdomain.com to projects... OK
Creating service postgresql-projects... OK
Binding postgresql-projects to projects... OK
Uploading projects... OK
Preparing to start projects... OK
...

```

### Notes ###
* The app runs both locally and on Cloud Foundry w/o any changes to it.
* Check out Cloud Foundry getting started <a href='http://docs.cloudfoundry.com/getting-started.html' target='_blank'>here</a>
* Install latest vmc tool by running `sudo gem install vmc ---pre`


### Credits ###
 * Front-end is from AngularJS example.

### Copyright ###
 VMware

