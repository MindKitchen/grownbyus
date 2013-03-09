# Required to run commands in the shell
{spawn, exec} = require 'child_process'

# Set up default arguments for running our Mocha tests.
# The first argument passed to Mocha is the location of our
# test files. Meteor expects our specs to be located in the
# "tests" folder, which differs from Mocha's default test 
# location (i.e. "test").
mocha_args = [
  'tests',
  '--compilers', 'coffee:coffee-script',
  '--require', 'chai',
  '--ui', 'bdd',
  '--colors',
]

# Standard test runner with complete spec-style output
task 'test', 'runs the Mocha test suite', ->
  args = mocha_args.concat ['--reporter', 'spec']...
  spawn 'mocha', args, stdio: 'inherit'

# Our watchful test runner to use during development and refactoring
task 'test:watch', 'runs the Mocha test suite whenever a file on the project is changed', ->
  args = mocha_args.concat [
    '--reporter', 'min',
    '--watch'
  ]...
  spawn 'mocha', args, stdio: 'inherit'
