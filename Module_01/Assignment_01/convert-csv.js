// add in required objects
const csvtojson = require('csvtojson')
const fs = require('fs')
const csvfile = 'customer-data.csv'
const jsonfile = 'customer-data.json'
let rows = 0
let jsonbuf = ''

// using csvtojson to read the input file
csvtojson()
	.fromFile(csvfile, function(err, result){
		if(err){
			console.log('Error processing csv file.')
			console.log(err)
		}
		// grab the resulting json into the output buffer
		jsonbuf = result
	})
	.on('header', (header)=>{
		console.log('Retreiving header information from ', csvfile)
		console.log(header)
	})
	.on('json', (jsonObj, rowIndex)=>{
		// calculate how many records were processed
		rows = rowIndex + 1
	})
	.on('data', (data)=>{
		// this did not give me the desired result in terms of output
		//   it was missing the commas after each record
		//jsonbuf += data.toString('utf8') + ','
	})
	.on('done', (error)=>{
		
		// write out the json to the output file
		// had to use JSON.stringify to obtain correct output, otherwise got "[object,object]..."
		try {
			fs.writeFile(jsonfile, JSON.stringify(jsonbuf), function (error) {
			  if (error) return console.error(error)
			})

			// uncomment next line to see output when run.
			//console.log(jsonbuf)
	    } catch (e) {
	      console.error(e.message)
	    }

		console.log('Processed Records:', rows)
		console.log('Conversion Completed')
	})
	.on('error', (err)=>{
		console.log(err)
	})




     // const parsedData = JSON.parse(rawData)

