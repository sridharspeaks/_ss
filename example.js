require('./objectUtilities.min');

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

console.log(obj.resolvePathsAsObject(
    [
        {'firstName':'*patient123'},
        {'lastName':'*lastName'},
        {'nameObj': '*name'},
        {'full': '*users'},
        {'^dateOfBirth': function(dob) {
                dob = new Date(dob);
                return `${dob.getFullYear()} / ${dob.getMonth() + 1}  / ${dob.getDate()}`;
            }(obj.resolvePathsAsObject('*dob').dob[0])},
        {'^userObject': function(user) {
                return {
                    firstName: user.name.firstName,
                    lastName: user.resolvePathsAsObject('*lastName')
                }
            }(obj.resolvePathsAsObject('*users[0]').users[0])

        }
    ]
));

/* ** ** Calling resolveByPaths in different paths patterns ** ** */

//Just String to get all Object
/*console.log(
	obj.resolveByPaths('*')
);*/

//Just an indexed number in case of Array
/*console.log(
	obj.resolveByPaths(0)
);*/

//Just like query String
/*console.log(
		obj.resolveByPaths('*patients[1].*lastName')
);*/

//Single Object
/*console.log(
	obj.resolveByPaths({'all': '*'})
);*/

//Array of Objects
/*console.log(
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
);*/
