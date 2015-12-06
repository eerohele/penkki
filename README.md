Penkki
======

Run one or more commands *n* times and measure how long each run takes. Get
result as JSON or incredibly useful and staggeringly engaging visualization.

## Examples

#### HTML

<img src="https://nw.kapsi.fi/penkki-html.png" width="600px"/>

#### Chart

<img src="https://nw.kapsi.fi/penkki-chart.png" width="600px"/>

#### Sparkly

<img src="https://nw.kapsi.fi/penkki-sparkly.png" width="600px"/>

#### JSON

<img src="https://nw.kapsi.fi/penkki-json.png" width="600px"/>

## Install

```bash
$ npm install -g penkki
```

## Examples

```bash
# Run Gradle 5 times.
$ penkki --times 5 gradle
[ '"gradle"',
  48527,
  29418,
  26333,
  25239,
  24540 ]

# Run ls, du, and df 5 times and save the resulting HTML/JS line chart
# as benchmark.html.
$ penkki --formatter html --times 5 --commands ls,du,df > benchmark.html
```

## Formatters

Formatter          | Example
-------------------|----------------------------------------------
JSON (default)     | `penkki -t 50 my-awesome-command`
[Chart][chart]     | `penkki -f chart -t 50 my-awesome-command`
[Sparkly][sparkly] | `penkki -f sparkly -t 50 my-awesome-command`
HTML ([C3][c3])    | `penkki -f html -t 50 my-awesome-command`

[c3]: http://c3js.org/
[chart]: https://github.com/jstrace/chart
[sparkly]: https://github.com/sindresorhus/sparkly

## License

Apache License 2.0.
