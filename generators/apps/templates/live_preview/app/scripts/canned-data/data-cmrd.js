/*global sap */
sap.zen.sdk.mock.registerCannedData({
    'name': 'Column Measures - Row Dimension',
    'data': {
        'selection': [-1, -1],
        'tuples': [
            [0, 0],
            [1, 0],
            [2, 0],
            [0, 1],
            [1, 1],
            [2, 1],
            [0, 2],
            [1, 2],
            [2, 2],
            [0, 3],
            [1, 3],
            [2, 3],
            [0, 4],
            [1, 4],
            [2, 4],
            [0, 5],
            [1, 5],
            [2, 5]
        ],
        'formattedData': ['72,709.98', '34,342.00', '29,010.56', '15,013.84', '7,052.00', '6,018.10', '84,146.72', '39,590.00', '33,618.67', '26,367.10', '12,280.00', '10,531.87', '78,302.76', '37,173.00', '31,234.32', '276,540.40', '130,437.00', '110,413.52'],
        'conditionalFormatValues': [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        'dimensions': [{
            'key': '[Measures]',
            'text': 'Measures',
            'axis': 'COLUMNS',
            'axis_index': 0,
            'containsMeasures': true,
            'members': [{
                'key': 'store_sales',
                'text': 'Store Sales',
                'scalingFactor': 0,
                'formatString': '#,##0.00;'-'#,##0.00'
            }, {
                'key': 'unit_sales',
                'text': 'Unit Sales',
                'scalingFactor': 0,
                'formatString': '#,##0.00;'-'#,##0.00'
            }, {
                'key': 'store_cost',
                'text': 'store_cost',
                'scalingFactor': 0,
                'formatString': '#,##0.00;'-'#,##0.00'
            }]
        }, {
            'key': 'education',
            'text': 'Education',
            'axis': 'ROWS',
            'axis_index': 0,
            'members': [{
                'key': 'Bachelors Degree',
                'text': 'Bachelors Degree'
            }, {
                'key': 'Graduate Degree',
                'text': 'Graduate Degree'
            }, {
                'key': 'High School Degree',
                'text': 'High School Degree'
            }, {
                'key': 'Partial College',
                'text': 'Partial College'
            }, {
                'key': 'Partial High School',
                'text': 'Partial High School'
            }, {
                'key': 'Result',
                'text': 'Total Result',
                'type': 'RESULT'
            }]
        }],
        'conditionalFormats': [],
        'locale': 'en_US',
        'axis_columns': [
            [0, -1],
            [1, -1],
            [2, -1]
        ],
        'axis_rows': [
            [-1, 0],
            [-1, 1],
            [-1, 2],
            [-1, 3],
            [-1, 4],
            [-1, 5]
        ],
        'columnCount': 3,
        'rowCount': 6
    }
});
