// Load 311 calls data (replace '311_calls.csv' with the actual path to your dataset)
d3.csv("311_boston_data.csv").then(function(data) {
    // Process data: Count the reasons and sort by frequency
    let reasonCounts = d3.rollup(
        data,
        v => v.length,
        d => d.reason
    );

    // Convert Map to Array and sort by counts
    reasonCounts = Array.from(reasonCounts, ([reason, count]) => ({ reason, count }))
                        .sort((a, b) => d3.descending(a.count, b.count));

    // Extract top 10 reasons
    const top10 = reasonCounts.slice(0, 10);

    // Chart dimensions and margins
    const margin = { top: 20, right: 20, bottom: 20, left: 250 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG canvas
    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create scales
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(top10, d => d.count)])
        .range([0, width]);

    const yScale = d3.scaleBand()
        .domain(top10.map(d => d.reason))
        .range([0, height])
        .padding(0.1);

    // Add bars
    svg.selectAll(".bar")
        .data(top10)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("y", d => yScale(d.reason))
        .attr("x", 0)
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .style("fill", "#4CAF50");

    // Add y-axis
    svg.append("g")
        .call(d3.axisLeft(yScale).tickSize(0))
        .selectAll("text")
        .style("font-size", "12px");

    // Add x-axis
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).ticks(5))
        .selectAll("text")
        .style("font-size", "12px");

    // Add headline
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("font-weight", "bold")
        .text("Top 10 Reasons for 311 Calls in Boston (2023)");

    // Add subheadline
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 10)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text("Based on the most frequent complaints logged in 2023");

    // Optional: Log for debugging
    console.log("Top 10 reasons for 311 calls:", top10);
});
