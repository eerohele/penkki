Penkki
======

Run a command *n* times and measure how long each run takes. Get result as JSON or incredibly useful and staggeringly engaging visualization.

## Examples

#### Chart

<img src="https://nw.kapsi.fi/penkki-chart.png" width="600px"/>

#### HTML

<img src="https://nw.kapsi.fi/penkki-html.png" width="600px"/>

#### Sparkly

<img src="https://nw.kapsi.fi/penkki-sparkly.png" width="600px"/>

#### JSON

<img src="https://nw.kapsi.fi/penkki-json.png" width="600px"/>

## Install

```bash
$ npm install -g penkki
```

## Basic use

```bash
# Run Gradle 5 times.
#
# Get the execution time of each run in milliseconds as a JSON array.
$ penkki --times 5 gradle
[ 1226.4869213104248,
  1182.739019393921,
  1135.329008102417,
  1088.3119106292725,
  1107.0971488952637 ]
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

