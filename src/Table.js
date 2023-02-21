/*
 * JS for Table component
 */

import React, {useEffect} from 'react';
import './Table.css';
import * as d3 from "d3";
import {Box} from "@mui/system";

// table element
let table = null;

// Indicator of the didMount stage
let didMount = true;

const Table = (props) => {
    // Create the reference to the Box container
    let myReference = React.createRef();

    // Sets the reference and creates the svg element
    const init = () => {
        let container = d3.select(myReference.current);
        table = container
            .append("div")
            .attr("id", "divtable")
            .append("table")
    }

    useEffect(() => {
        // ComponentDidMount check
        if (didMount) {
            didMount = false;
            init();
        }
        if (props.dataset == null) {
            return;
        }
        paint();
    });

    const paint = () => {
        const keys = props.dataset.data.length > 0 ? Object.keys(props.dataset.data[0]) : [ "", ""];

        table
            .selectAll("*")
            .remove();
        // Creates and initializes the table body.
        if (props.dataset.data === null) {
            return;
        }

        table
            .append("caption")
            .append("input")
            .attr("pointId", "caption")
            .attr("id", 0)
            .attr("type", "text")
            .attr("value", props.dataset.title)
            .on("blur", (event) => {
                props.handleChange(event);
            });


        table
            .append("thead")
            .append("tr")
            .attr("pointId", "header")
            .selectAll("th")
            .data(keys)
            .enter()
            .append("th")
            .append("input")
            .attr("type", "text")
            .attr("value", (item) => {
                return item;
            })
            .attr("attributeId", (item, index) => {
                return index;
            })
            .attr("pointId", "header")
            .on("blur", (event) => {
                props.handleChange(event);
            });

        table
            .select("thead")
            .append("tr")
            .append("th")
            .attr("colspan", "2")
            .append("input")
            .attr("type", "button")
            .attr("value", "Append Data Point")
            .attr("pointId", "append")
            .on("click", props.handleChange);

        table
            .append("tbody")
            .selectAll("tr")
            .data(props.dataset.data)
            .enter()
            .append("tr")
            .attr("pointId", (item, index) => {
                return index;
            })
            .style("background-color", (item , index) => {
                return props.selection != null && props.selection.includes(index) ? "red" : "dodgerblue";
            })
            .selectAll("td")
            .data((item) => {
                return Object.values(item);
            })
            .enter()
            .append("td")
            .on("click", (e) => {
                if (props.onSelect != null && e.target.parentElement.attributes.pointId !== undefined) {
                    let event = {};
                    event.target = {};
                    event.target.dataPointIndex = parseFloat(e.target.parentElement.attributes.pointId.value);
                    props.onSelect(event);
                }
            })
            .append("input")
            .attr("type", "text")
            .attr("value", (item) => {
                return item;
            })
            .attr("pointId", function(item, index) {
                return this.parentElement.parentElement.attributes.pointId.value;
            })
            .attr("attributeId", (item, index) => {
                return index;
            })
            .on("blur", (event) => {
                props.handleChange(event);
            })
            .on("keyDown", validate);
    }

    const validate = (event) => {
        if (event.key.length === 1
            && /\D/.test(event.key)
            && !(event.key === '.' && !event.target.value.includes('.'))) {
            event.preventDefault();
        }
    }

    return (
        <Box ref={myReference}                 sx={{ display: "flex",
                flexDirection: "column",
                    overflow: "hidden",
        overflowY: "scroll", ...props.sx}}>
        </Box>
    );

}

export default Table;
