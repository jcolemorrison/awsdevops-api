'use strict'

const fs = require('fs')

// grab our base task
const task = require('./task-definition.json')
const updatedTask = task
const tag = 'awsdevops/api'

// url to our image repository
const url = `${process.env.AWS_ACCOUNT_ID}.dkr.ecr.${process.env.AWS_DEFAULT_REGION}.amazonaws.com`

// tag of updated image
const image = `${url}/${tag}:${process.env.CIRCLE_SHA1}`

// set our updated image
updatedTask.containerDefinitions[0].image = image

// set our environment RDS variables
updatedTask.containerDefinitions[0].environment = [
  {
    'name': 'PRODUCTION_RDS_HOST',
    'value': process.env.PRODUCTION_RDS_HOST,
  },
  {
    'name': 'PRODUCTION_RDS_DB',
    'value': process.env.PRODUCTION_RDS_DB,
  },
  {
    'name': 'PRODUCTION_RDS_USER',
    'value': process.env.PRODUCTION_RDS_USER,
  },
  {
    'name': 'PRODUCTION_RDS_PWD',
    'value': process.env.PRODUCTION_RDS_PWD,
  },
  {
    'name': 'NODE_ENV',
    'value': 'production',
  },
]

// set logs
updatedTask.containerDefinitions[0].logConfiguration.options = {
  'awslogs-group': process.env.AWSLOGS_GROUP,
  'awslogs-region': process.env.AWSLOGS_REGION,
  'awslogs-stream-prefix': process.env.AWSLOGS_STREAM_PREFIX,
}

// convert back to json
const jsonTask = JSON.stringify(updatedTask)

// create temporary file
fs.writeFile('updated-task.json', jsonTask, 'utf8')
