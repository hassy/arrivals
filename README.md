# arrival-process

**Purpose**: Use this library to model the arrival of events in a system.

**For example**: Model the arrival of visitors to a website; incoming phone calls to
an exchange; spawning of ghosts in your Pacman clone.

This library was originally developed for use in [Minigun](https://artillery.io/minigun).
Minigun is a modern load-testing tool with a focus on usability.

## Usage

`npm install --save arrival-process`

Two models of arrival processes are available: [Poisson](http://en.wikipedia.org/wiki/Poisson_process) and Uniform.


```javascript
//
// Poisson process example
//
var arrivals = require('arrival-process');

// Create a Poisson process with the mean inter-arrival time of 500 ms that
// will run for 20 seconds:
var p = arrivals.poisson.process(500, callback, 20 * 1000);

// Arrival callback:
function callback() {
  console.log('New arrival, %s', new Date());
}

p.once('finished', function() {
  console.log('We are done.');
});

p.start();
```

If the last argument (total duration of the process) is omitted, the process
will run until stopped with `p.stop()`.

```javascript
//
// Uniform arrivals example:
//
var arrivals = require('arrival-process');

// Create an arrivals process that will trigger the callback every 500ms for
// 20 seconds (for a total of 20000 / 200 = 40 arrivals)
var p = arrivals.uniform.process(500, callback, 20 * 1000);

function callback() {
  console.log('New arrival, %s', new Date());
}

p.once('finished', function() {
  console.log('We are done.');
});

p.start();
```

The last argument (total duration) is optional as in the previous example.

**NOTE:** When using uniform process, setting the inter-arrival time to N ms
and duration to D ms will yield D/N arrivals as intuitively expected. However,
stopping the process with `p.stop()` via `setTimeout` with the same N and D
values will result in D/N-1 arrivals.

## License

This software is distributed under the terms of the [ISC](http://en.wikipedia.org/wiki/ISC_license) license.

```
Copyright (c) 2015, Hassy Veldstra <h@veldstra.org>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
```