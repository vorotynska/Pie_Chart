const height = 500;
const width = 500;
const margin = 30;
const data = [{
        browser: "Google Chrome",
        rate: 42.52
    },
    {
        browser: "Firefox",
        rate: 16.23
    },
    {
        browser: "Opera",
        rate: 12.6
    },
    {
        browser: "Yandex Browser",
        rate: 9.12
    },
    {
        browser: "Internet Explorer",
        rate: 10.56
    },
    {
        browser: "Другие",
        rate: 8.97
    }
];

const color = d3.scaleOrdinal()
    .range(d3.schemeCategory10
        .map(function (c) {
            c = d3.rgb(c);
            c.opacity = 0.7;
            return c;
        }));

const radius = Math.min(width - 2 * margin, height - 2 * margin) / 2;
const arc = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);

const pie = d3.pie()
    .sort(null)
    .value(d => d.rate);


const data_ready = pie(Object.entries(data))

const svg = d3.select('#data_visited').append('svg')
    .attr('class', 'axis')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr("transform",
        "translate(" + (width / 2) + "," + (height / 2) + ")");

const g = svg.selectAll('.arc')
    .data(pie(data))
    .enter().append('g')
    .attr('class', 'arc')
    .style("stroke-width", "2px")
    .style("opacity", 0.6)

g.append('path')
    .attr('d', arc)
    .style('fill', d => color(d.data.browser));

g.append("text")
    .attr("transform", function (d) {
        return "translate(" + arc.centroid(d) + ")";
    })
    .style("text-anchor", "middle")
    .text(function (d) {
        return d.data.rate + '%';
    });
let legendTable = d3.select('svg').append('g')
    .attr("transform", "translate(0, " + margin + ")")
    .attr("class", "legendTable");

let legend = legendTable.selectAll('.legend')
    .data(pie(data))
    .enter().append('g')
    .attr('class', 'legend')
    .attr("transform", function (d, i) {
        return "translate(0, " + i * 20 + ")";
    });

legend.append('rect')
    .attr('x', width - 10)
    .attr('y', 4)
    .attr('width', 10)
    .attr('height', 10)
    .style('fill', d => color(d.data.browser));

legend.append('text')
    .attr('x', width - 14)
    .attr('y', 9)
    .attr('dy', '.35em')
    .style('text-anchor', 'end')
    .text((d) => d.data.browser);




// set the dimensions and margins of the graph