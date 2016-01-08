'use strict';

var arrivals = require('../lib');
var tape = require('tape');

tape('Can create a Poisson process', function(t) {
  var count = 0;
  var p = arrivals.poisson.process(400);
  p.on('arrival', function() {
    t.ok(true, '  got arrival event ' + (++count));
  });
  p.once('finished', function() {
    t.ok(true, '  got finished event');
  });

  t.ok(p, 'Process created');
  p.start();
  t.ok(true, 'Process started');
  setTimeout(function() {
    p.stop();
    t.end();
  }, 2800);
});

tape('Can create a Poisson process with fixed duration', function(t) {
  var count = 0;
  var p = arrivals.poisson.process(400, 2800);
  p.on('arrival', function() {
    t.ok(true, '  got arrival event ' + (++count));
  });
  p.once('finished', function() {
    t.ok(true, '  got finished event');
    t.end();
  });

  t.ok(p, 'Process created');
  p.start();
  t.ok(true, 'Process started');
});

tape('Can create a uniform process', function(t) {
  var count = 0;
  var p = arrivals.uniform.process(400);
  p.on('arrival', function() {
    t.ok(true, '  got arrival event ' + (++count));
  });
  p.once('finished', function() {
    t.ok(true, '  got finished event');
  });

  t.ok(p, 'Process created');
  p.start();
  t.ok(true, 'Process started');
  setTimeout(function() {
    p.stop();
    t.assert(count === 6, 'Correct number of arrivals');
    t.end();
  }, 2700);
});

tape('Can create a uniform process with fixed duration', function(t) {
  var count = 0;
  var p = arrivals.uniform.process(400, 2700);
  p.on('arrival', function() {
    t.ok(true, '  got arrival event ' + (++count));
  });
  p.once('finished', function() {
    t.ok(true, '  got finished event');
    t.assert(count === 7, 'Correct number of arrivals');
    t.end();
  });

  t.ok(p, 'Process created');
  p.start();
  t.ok(true, 'Process started');
});
