import Application from "expert-advice/app";
import config from "expert-advice/config/environment";
import * as QUnit from "qunit";
import { setApplication } from "@ember/test-helpers";
import { setup } from "qunit-dom";
import { start } from "ember-qunit";

setApplication(Application.create(config.APP));

setup(QUnit.assert);

start();
