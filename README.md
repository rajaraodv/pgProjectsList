<h1>A Node.js app that ports the <a href='http://angularjs.org/#mongolab-js' target='_blank'>AngularJS Todo app</a> to use Postgres backend(instead of MongoDB)</h1>

<p align="center">
<span style='align:left'> <img src="https://raw.github.com/rajaraodv/pgtodo/master/gitImgs/appImg0.png" height="250px" width="350px" /></span><span style='align:left'>
<img src="https://raw.github.com/rajaraodv/pgtodo/master/gitImgs/appImg1.png" height="250px" width="350px" /></span>
</p>

#### Running it locally ####
* Clone the app to `pgtodo` folder
* `cd pgtodo` folder
* `npm install`
* `node app.js`
* open browser at `localhost:3000`


#### Running it on Cloud Foundry ####

* Clone the app to `pgtodo` folder
* `cd pgtodo` folder
* `npm install`

```
> vmc push pgtodo
Instances> 1

1: node
2: other
Framework> node  <---- Select Node.js framework

1: node
2: node06
3: node08
4: other
Runtime> 3  <---- Select Node.js 0.8v of runtime

1: 64M
2: 128M
3: 256M
4: 512M
Memory Limit> 64M <----- 64MB memory

Creating pgtodo... OK

1: pgtodo.cloudfoundry.com
2: none
URL> pgtodo.cloudfoundry.com   <---------This'll be the url of your app

Updating pgtodo... OK

Create services for application?> y

1: blob 0.51
2: mongodb 2.0
3: mysql 5.1
4: postgresql 9.0
5: rabbitmq 2.4
6: redis 2.4
7: redis 2.2
8: redis 2.6
What kind?> 4      <--------------- Select & add Postgresql service

Name?> postgres-ccc0e <-- Just a name of the PG service

Creating service postgres-ccc0e... OK
Binding postgres-ccc0e to pgtodo... OK
Create another service?> n

Bind other services to application?> n

Save configuration?> n

Uploading pgtodo... OK
Starting pgtodo... OK
Checking pgtodo... OK
```

### Notes ###
* The app runs both locally and on Cloud Foundry w/o any changes to it.
* Check out Cloud Foundry getting started <a href='http://docs.cloudfoundry.com/getting-started.html' target='_blank'>here</a>
* Install latest vmc tool by running `sudo gem install vmc ---pre`


### Credits ###
 * Front-end is from AngularJS example.

### Copyright ###
 VMware

