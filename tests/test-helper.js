import Application from 'ember-test-assignment/app';
import config from 'ember-test-assignment/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
