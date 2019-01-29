require('chart.js');
(function () {
    "use strict";
    var Charts = {
        _HYPHY_REGEX: /-([a-z])/g,
        _cleanAttr: function (t) {
            delete t.chart, delete t.datasets, delete t.datasetsOptions, delete t.labels, delete t.options
        },
        "spark": function (element) {
            var attrData = $.extend({}, $(element).data()),
                data = attrData.dataset ? eval(attrData.dataset) : [],
                datasetOptions = attrData.datasetOptions ? eval(attrData.datasetOptions) : [],
                labels = attrData.labels ? eval(attrData.labels) : {},
                options = attrData.options ? eval("(" + attrData.options + ")") : {},
                data = {
                    labels: labels,
                    datasets: data.map(function (t, a) {
                        return $.extend({
                            data: t,
                            fill: !0,
                            backgroundColor: "rgba(255,255,255,.3)",
                            borderColor: "#fff",
                            pointBorderColor: "#fff",
                            lineTension: .25,
                            pointRadius: 0
                        }, datasetOptions[a])
                    })
                };
            Charts._cleanAttr(attrData);
            var options = $.extend({
                animation: {
                    duration: 0
                },
                legend: {
                    display: !1
                },
                scales: {
                    xAxes: [{
                        display: !1
                    }],
                    yAxes: [{
                        display: !1
                    }]
                },
                tooltips: {
                    enabled: !1
                }
            }, options);

            new Chart(element.getContext("2d"), {
                type: $(element).data().chartType,
                data: data,
                options: options
            })
        },
        line: function (element) {
            var attrData = $.extend({}, $(element).data()),
                data = attrData.dataset ? eval(attrData.dataset) : [],
                datasetOptions = attrData.datasetOptions ? eval(attrData.datasetOptions) : [],
                labels = attrData.labels ? eval(attrData.labels) : {},
                options = attrData.options ? eval("(" + attrData.options + ")") : {},
                isDark = !!attrData.dark,
                data = {
                    labels: labels,
                    datasets: data.map(function (t, a) {
                        return $.extend({
                            data: t,
                            fill: !0,
                            backgroundColor: isDark ? "rgba(28,168,221,.03)" : "rgba(66,165,245,.2)",
                            borderColor: "#42a5f5",
                            pointBorderColor: "#fff",
                            lineTension: .25,
                            pointRadius: 0,
                            pointHoverRadius: 0,
                            pointHitRadius: 20
                        }, datasetOptions[a])
                    })
                };
            Charts._cleanAttr(attrData);
            var options = $.extend({
                maintainAspectRatio: !1,
                animation: {
                    duration: 0
                },
                legend: {
                    display: !1
                },
                scales: {
                    yAxes: [{
                        gridLines: {
                            color: isDark ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.05)",
                            zeroLineColor: isDark ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.05)",
                            drawBorder: !1
                        },
                        ticks: {
                            beginAtZero: !1,
                            fixedStepSize: 1e3,
                            fontColor: isDark ? "#a2a2a2" : "rgba(0,0,0,.4)",
                            fontSize: 14
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: !1
                        },
                        ticks: {
                            fontColor: isDark ? "#a2a2a2" : "rgba(0,0,0,.4)",
                            fontSize: 14
                        }
                    }]
                },
                tooltips: {
                    enabled: !0,
                    bodyFontSize: 14,
                    callbacks: {
                        title: function () {
                            return ""
                        },
                        labelColor: function () {
                            return {
                                backgroundColor: "#42a5f5",
                                borderColor: "#42a5f5"
                            }
                        }
                    }
                }
            }, options);
            new Chart(element.getContext("2d"), {
                type: "line",
                data: data,
                options: options
            })
        },
        bar: function (element) {
            var attrData = $.extend({}, $(element).data()),
                data = attrData.dataset ? eval(attrData.dataset) : [],
                datasetOptions = attrData.datasetOptions ? eval(attrData.datasetOptions) : [],
                labels = attrData.labels ? eval(attrData.labels) : {},
                options = attrData.options ? eval("(" + attrData.options + ")") : {},
                isDark = !!attrData.dark,
                data = {
                    labels: labels,
                    datasets: data.map(function (t, a) {
                        return $.extend({
                            data: t,
                            fill: !0,
                            backgroundColor: a % 2 ? "#42a5f5" : "#1bc98e",
                            borderColor: "transparent"
                        }, datasetOptions[a])
                    })
                };
            Charts._cleanAttr(attrData);
            var options = $.extend({
                maintainAspectRatio: !1,
                animation: {
                    duration: 0
                },
                legend: {
                    display: !1
                },
                scales: {
                    yAxes: [{
                        gridLines: {
                            color: isDark ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.05)",
                            zeroLineColor: isDark ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.05)",
                            drawBorder: !1
                        },
                        ticks: {
                            fixedStepSize: 25,
                            fontColor: isDark ? "#a2a2a2" : "rgba(0,0,0,.4)",
                            fontSize: 14
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: !1
                        },
                        ticks: {
                            fontColor: isDark ? "#a2a2a2" : "rgba(0,0,0,.4)",
                            fontSize: 14
                        }
                    }]
                },
                tooltips: {
                    enabled: !0,
                    bodyFontSize: 14
                }
            }, options);
            new Chart(element.getContext("2d"), {
                type: "bar",
                data: data,
                options: options
            })
        },
        chartJs: function (element) {
            var attrData = $.extend({}, $(element).data()),
                data = attrData.dataset ? eval(attrData.dataset) : [],
                datasetOptions = attrData.datasetOptions ? eval(attrData.datasetOptions) : [],
                labels = attrData.labels ? eval(attrData.labels) : {},
                options = attrData.options ? eval("(" + attrData.options + ")") : {},
                isDark = !!attrData.dark,
                data = {
                    labels: labels,
                    datasets: data.map(function (t, a) {
                        return $.extend({
                            data: t,
                            fill: !0,
                            backgroundColor: a % 2 ? "#42a5f5" : "#1bc98e",
                            borderColor: "transparent"
                        }, datasetOptions[a])
                    })
                };
            Charts._cleanAttr(attrData);
            var options = $.extend({
                maintainAspectRatio: !1,
                animation: {
                    duration: 0
                },


                tooltips: {
                    enabled: !0,
                    bodyFontSize: 14
                }
            }, options);
            new Chart(element.getContext("2d"), {
                type: $(element).data().chartType,
                data: data,
                options: options
            })
        },
        radar: function (element) {
            var attrData = $.extend({}, $(element).data()),
                data = attrData.dataset ? eval(attrData.dataset) : [],
                datasetOptions = attrData.datasetOptions ? eval(attrData.datasetOptions) : [],
                labels = attrData.labels ? eval(attrData.labels) : {},
                options = attrData.options ? eval("(" + attrData.options + ")") : {},
                isDark = !!attrData.dark,
                data = {
                    labels: labels,
                    datasets: data.map(function (t, a) {
                        return $.extend({
                            data: t,
                            fill: !0,
                            backgroundColor: a % 2 ? "#42a5f5" : "#1bc98e",
                            borderColor: "transparent"
                        }, datasetOptions[a])
                    })
                };
            Charts._cleanAttr(attrData);
            var options = $.extend({
                maintainAspectRatio: !1,
                animation: {
                    duration: 0
                },
                legend: {
                    display: !1
                },
                scales: {
                    yAxes: [{
                        gridLines: {
                            color: isDark ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.05)",
                            zeroLineColor: isDark ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.05)",
                            drawBorder: !1
                        },
                        ticks: {
                            fixedStepSize: 25,
                            fontColor: isDark ? "#a2a2a2" : "rgba(0,0,0,.4)",
                            fontSize: 14
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: !1
                        },
                        ticks: {
                            fontColor: isDark ? "#a2a2a2" : "rgba(0,0,0,.4)",
                            fontSize: 14
                        }
                    }]
                },
                tooltips: {
                    enabled: !0,
                    bodyFontSize: 14
                }
            }, options);
            new Chart(element.getContext("2d"), {
                type: "radar",
                data: data,
                options: options
            })
        }
    };

    var initCharts = function () {
        $("[data-chart]").each(function () {
            $(this).is(":visible")
            && !$(this).hasClass("js-chart-drawn")
            && (Charts[$(this).attr("data-chart")](this), $(this).addClass("js-chart-drawn"))
        })
    };

    initCharts();

    //if chart inside a tab
    $('a[data-toggle="tab"], a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
        initCharts();
    });

}());

//custom gradient chart example---------------------

$(function () {
    'use strict';
    if ($('#gradientChart').length) {
        var ctx = document.getElementById('gradientChart').getContext("2d");

        var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, '#03a9f4');
        gradientStroke.addColorStop(1, '#3f51b5');

        var gradientFill = ctx.createLinearGradient(500, 0, 100, 0);
        gradientFill.addColorStop(0, "rgba(3, 169, 244, 0.6)");
        gradientFill.addColorStop(1, "rgba(63, 81, 181, 0.6)");

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"],
                datasets: [{
                    label: "Data",
                    borderColor: gradientStroke,
                    pointBorderColor: gradientStroke,
                    pointBackgroundColor: gradientStroke,
                    pointHoverBackgroundColor: gradientStroke,
                    pointHoverBorderColor: gradientStroke,
                    pointBorderWidth: 5,
                    pointHoverRadius: 5,
                    pointHoverBorderWidth: 1,
                    pointRadius: 5,
                    fill: true,
                    backgroundColor: gradientFill,
                    borderWidth: 4,
                    data: [0, 170, 80, 60, 80, 170, 20]
                }]
            },
            options: {
                animation: {
                    easing: "easeInOutBack"
                },
                legend: {
                    display: false,
                    position: "bottom"
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold",
                            beginAtZero: true,
                            maxTicksLimit: 5,
                            padding: 20
                        },
                        gridLines: {
                            drawTicks: false,
                            display: false
                        }

                    }],
                    xAxes: [{
                        gridLines: {
                            zeroLineColor: "transparent"
                        },
                        ticks: {
                            padding: 20,
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold"
                        }
                    }]
                }
            }
        });
    }
});

//stroke chart example-----------------------

$(function(){
    'use strict';

    if ($('#strokeChart').length) {
        var ctx = document.getElementById('strokeChart').getContext("2d");

        var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, '#80b6f4');
        gradientStroke.addColorStop(1, '#f49080');

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"],
                datasets: [{
                    label: "Data",
                    borderColor: "transparent",
                    pointBorderColor: gradientStroke,
                    pointBackgroundColor: gradientStroke,
                    pointHoverBackgroundColor: gradientStroke,
                    pointHoverBorderColor: gradientStroke,
                    pointBorderWidth: 10,
                    pointHoverRadius: 10,
                    pointHoverBorderWidth: 1,
                    pointRadius: 3,
                    fill: false,
                    data: [100, 120, 150, 170, 180, 170, 160]
                }]
            },
            options: {
                legend: {
                    position: "bottom"
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold",
                            beginAtZero: true,
                            maxTicksLimit: 5,
                            padding: 20
                        },
                        gridLines: {
                            drawTicks: false,
                            display: false
                        }

                    }],
                    xAxes: [{
                        gridLines: {
                            zeroLineColor: "transparent"
                        },
                        ticks: {
                            padding: 20,
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold"
                        }
                    }]
                }
            }
        });
    }
});


