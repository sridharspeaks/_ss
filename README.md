# objectUtilities

A Node.js package that parses an object to the required form using array of custom query string
to represent child path(s).


## Usage

First, install the package using npm:

    npm install _ss --save

Then, require the package and use it like so:

    require('_ss');

    var obj = {
        0: 'some first element under index 0',
        services: {
            patients: [
                {
                    name: {
                        firstName: 'Sridhar',
                        lastName: 'Gudimela'
                    }
                },
                {
                    name: {
                        firstName: 'Sridhar1',
                        lastName: 'Gudimela1'
                    }
                }
            ],
            users: [
                {
                    name: {
                        firstName: 'Mary'
                    }
                },
                {
                    name: {
                        firstName: 'Sridhar3',
                        lastName: 'Gudimela3'
                    },
                    dob: 1536718635529
                }
            ]
        }
    }

    //Just String to get all Object
    console.log(obj.resolveByPaths('*'));

    //Just an indexed number in case of Array
    console.log(obj.resolveByPaths(0));

    //Just like query String
    console.log(obj.resolveByPaths('*patients[1].*lastName'));

    //Single Object
    console.log(obj.resolveByPaths({'all': '*'}));

    //Array of Objects
    console.log(
        obj.resolveByPaths(
        [
          {'name': '*name'},
          {'firstName': 'services.*.*users.*firstName'},
          {'lastName': '*patients[0].*lastName'},
          {'lastName': '*patients[1].*lastName'},
          {'allLastNames': '*lastName'},
          {'patient.lastName': '*users[0].*lastName'}
        ]
        )
    );

