/* global module */
module.exports = {
    'dist': {
        'options': {
            'patterns': [{
                'match': 'bundle',
                'replacement': '<%%= bundle %>'
            }, {
                'match': 'version',
                'replacement': '<%%= version %>'
            }, {
                'match': 'titleLower',
                'replacement': '<%%= sdkNameLower %>'
            }, {
                'match': 'titleOneWord',
                'replacement': '<%%= sdkNameOneWord %>'
            }, {
                'match': 'ds_version',
                'replacement': '<%%= dsVersion %>'
            }, {
                'match': 'ds_base_version',
                'replacement': '<%%= dsBaseVersion %>'
            }, {
                'match': 'timestamp',
                'replacement': '<%%= timestamp %>'
            }]
        },
        'files': [{
            'expand': true,
            'flatten': true,
            'src': 'src/feature_files/*',
            'dest': '.tmp/feature_files/'
        }]
    },
    'manifest': {
        'options': {
            'patterns': [
                {
                    'match': /Bundle-Version.*/,
                    'replacement': 'Bundle-Version: <%%= dsVersion %>.<%%= timestamp %>'
                },
                {
                    'match': /Bundle-SymbolicName.*/,
                    'replacement': 'Bundle-SymbolicName: <%%= bundle %>.<%%= sdkNameLower %>;singleton:=true'
                },
                {
                    'match': /Bundle-Name.*/,
                    'replacement': 'Bundle-Name: <%%= sdkExtensionTitle %>'
                }
            ]
        },
        'files': [{
            'expand': true,
            'flatten': true,
            'src': 'src/component/META-INF/MANIFEST.MF',
            'dest': 'src/component/META-INF'
        }]
    }
};
