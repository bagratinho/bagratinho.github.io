var ItemList = [
	{
		id: 1,
		type: "build",
		name: "Tenrox",
		status: "Pending",
		details: [
			{
				label: "Metrics",
				status: "Pending"
			},
			{
				label: "Build",
				status: "Pending",
				date: "10/12/2016"
			},
			{
				label: "Unit Test",
				status: "Pending"
			},
			{
				label: "Functional Test",
				status: "Pending"
			}
		]
	},
	{
		id: 2,
		type: "firewall",
		owner: "John Doe",
		name: "327784",
		started: "10/12/2016",
		status: "Running",
		details: [
			{
				label: "Metrics",
				status: "Complete",
				items: [
					{
						label: "Test",
						value: 64,
						trend: 1
					},
					{
						label: "Maintainability",
						value: 64,
						trend: 1
					},
					{
						label: "Security",
						value: 64,
						trend: 1
					},
					{
						label: "Workmanship",
						value: 64,
						trend: 1
					},
				]
			},
			{
				label: "Build",
				status: "Complete",
				date: "10/12/2016"
			},
			{
				label: "Unit Test",
				status: 72
			},
			{
				label: "Functional Test",
				status: "Pending"
			}
		]
	},
	{
		id: 3,
		type: "firewall",
		owner: "John Doe",
		name: "122347",
		status: "Pending",
		details: [
			{
				label: "Metrics",
				status: "Pending"
			},
			{
				label: "Build",
				status: "Pending"
			},
			{
				label: "Unit Test",
				status: "Pending"
			},
			{
				label: "Functional Test",
				status: "Pending"
			}
		]
	},
	{
		id: 4,
		type: "firewall",
		owner: "John Doe",
		name: "025467",
		started: "10/12/2016",
		status: "Rejected",
		status_txt: "Metrics Reduction",
		details: [
			{
				label: "Metrics",
				status: "Rejected",
				items: [
					{
						label: "Test",
						value: 16,
						trend: -1
					},
					{
						label: "Maintainability",
						value: 7,
						trend: -1
					},
					{
						label: "Security",
						value: 58,
						trend: -1
					},
					{
						label: "Workmanship",
						value: 122,
						trend: -1
					},
				]
			},
			{
				label: "Build",
				status: "Failed",
				date: "10/12/2016"
			},
			{
				label: "Unit Test",
				status: "Failed",
				chartData: [
					{
						label: "passed",
						value: 58
					},
					{
						label: "failed",
						value: 408
					}
				],
				code_covered_prc: 26
			},
			{
				label: "Functional Test",
				status: "Failed",
				chartData: [
					{
						label: "passed",
						value: 60
					},
					{
						label: "failed",
						value: 162
					}
				],
				code_covered_prc: 38
			}
		]
	},
	{
		id: 5,
		type: "firewall",
		owner: "John Doe",
		name: "975645",
		started: "10/12/2016",
		status: "Running",
		details: [
			{
				label: "Metrics",
				status: 65
			},
			{
				label: "Build",
				status: "Pending",
			},
			{
				label: "Unit Test",
				status: "Pending",
				passed: 200,
				failed: 120,
				code_covered_prc: 76
			},
			{
				label: "Functional Test",
				status: "Pending",
				passed: 200,
				failed: 120,
				code_covered_prc: 76
			}
		]
	},
	{
		id: 6,
		type: "build",
		name: "Tenrox",
		status: "Failed",
		started: "10/12/2016",
		details: [
			{
				label: "Metrics",
				status: "Complete",
				items: [
					{
						label: "Test",
						value: 64,
						trend: 1
					},
					{
						label: "Maintainability",
						value: 64,
						trend: 0
					},
					{
						label: "Security",
						value: 64,
						trend: 1
					},
					{
						label: "Workmanship",
						value: 64,
						trend: 0
					},
				]
			},
			{
				label: "Build",
				status: "Complete",
				date: "10/12/2016"
			},
			{
				label: "Unit Test",
				status: "Failed",
				chartData: [
					{
						label: "passed",
						value: 100
					},
					{
						label: "failed",
						value: 450
					}
				],
				code_covered_prc: 76
			},
			{
				label: "Functional Test",
				status: "Pending"
			}
		]
	},
	{
		id: 7,
		type: "build",
		name: "Tenrox",
		status: "Complete",
		started: "10/12/2016",
		details: [
			{
				label: "Metrics",
				status: "Complete",
				items: [
					{
						label: "Test",
						value: 64,
						trend: 1
					},
					{
						label: "Maintainability",
						value: 64,
						trend: 0
					},
					{
						label: "Security",
						value: 64,
						trend: -1
					},
					{
						label: "Workmanship",
						value: 64,
						trend: 1
					},
				]
			},
			{
				label: "Build",
				status: "Complete",
				date: "10/12/2016"
			},
			{
				label: "Unit Test",
				status: "Complete",
				chartData: [
					{
						label: "passed",
						value: 200
					},
					{
						label: "failed",
						value: 100
					}
				],
				code_covered_prc: 76
			},
			{
				label: "Functional Test",
				status: "Complete",
				chartData: [
					{
						label: "passed",
						value: 18
					},
					{
						label: "failed",
						value: 3
					}
				],
				code_covered_prc: 88
			}
		]
	},
	{
		id: 8,
		type: "firewall",
		owner: "John Doe",
		name: "455124",
		started: "10/12/2016",
		status: "Running",
		details: [
			{
				label: "Metrics",
				status: "Complete",
				items: [
					{
						label: "Test",
						value: 92,
						trend: 1
					},
					{
						label: "Maintainability",
						value: 4,
						trend: 0
					},
					{
						label: "Security",
						value: 25,
						trend: -1
					},
					{
						label: "Workmanship",
						value: 12,
						trend: 1
					},
				]
			},
			{
				label: "Build",
				status: "Complete",
				date: "10/12/2016"
			},
			{
				label: "Unit Test",
				status: 25,
				code_covered_prc: 76
			},
			{
				label: "Functional Test",
				status: "Pending",
				code_covered_prc: 68
			}
		]
	},
	{
		id: 9,
		type: "firewall",
		owner: "John Doe",
		name: "455124",
		started: "10/12/2016",
		status: "Rejected",
		status_txt: "Metrics Reduction",
		details: [
			{
				label: "Metrics",
				status: "Failed",
				items: [
					{
						label: "Test",
						value: 5,
						trend: -1
					},
					{
						label: "Maintainability",
						value: 4,
						trend: 0
					},
					{
						label: "Security",
						value: 25,
						trend: -1
					},
					{
						label: "Workmanship",
						value: 36,
						trend: 1
					},
				]
			},
			{
				label: "Build",
				status: "Pending",
				date: "10/12/2016"
			},
			{
				label: "Unit Test",
				status: "Pending",
				code_covered_prc: 76
			},
			{
				label: "Functional Test",
				status: "Pending",
				code_covered_prc: 68
			}
		]
	},
	{
		id: 10,
		type: "firewall",
		owner: "John Doe",
		name: "123456",
		started: "10/12/2016",
		status: "Accepted",
		status_txt: "Auto Merged",
		details: [
			{
				label: "Metrics",
				status: "Complete",
				items: [
					{
						label: "Test",
						value: 11,
						trend: 1
					},
					{
						label: "Maintainability",
						value: 64,
						trend: 0
					},
					{
						label: "Security",
						value: 53,
						trend: -1
					},
					{
						label: "Workmanship",
						value: 8,
						trend: 1
					},
				]
			},
			{
				label: "Build",
				status: "Complete",
				date: "10/12/2016"
			},
			{
				label: "Unit Test",
				status: "Complete",
				chartData: [
					{
						label: "passed",
						value: 82
					},
					{
						label: "failed",
						value: 13
					}
				],
				code_covered_prc: 55
			},
			{
				label: "Functional Test",
				status: "Complete",
				chartData: [
					{
						label: "passed",
						value: 700
					},
					{
						label: "failed",
						value: 20
					}
				],
				code_covered_prc: 68
			}
		]
	}
]

export default ItemList;
