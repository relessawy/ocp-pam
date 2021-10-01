#!/bin/bash

project_name="rhpam-mod2"
oc project ${project_name}
oc delete all -l app=procurement-process-web

oc new-app --strategy="source" \
--name="procurement-process-web" \
--code="https://github.com/relessawy/ocp-pam"

oc expose svc/procurement-process-web
