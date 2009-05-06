function TestCase() {
	var tests = {}
	var failures = 0
	var runs = 0
	
	var bar       = "=============================================================================="
	var redcode   = 31
	var greencode = 32
	
	var setUpCallback = function() {};
	var tearDownCallback = function() {};
	
	test = function(name, callback) {
		tests[name] = callback;
	}
	
	setup = function(callback) {
		setUpCallback = callback;
	}
	
	teardown = function(callback) {
		tearDownCallback = callback;
	}
	
	assertEqual = function(expected, tested) {
		if(expected != tested) {
			throw 'expected ' + expected + ', got ' + tested
		}
	}
	
	assert = function(expression) {
		if(!expression) {
			throw '<' + expression + '> is not true'
		}
	}
	
	this.summary = function() {
		return runs + ' tests, ' + failures + ' failed'
	}
	
	this.bar = function() {
		code = failures == 0 ? greencode : redcode
		return('\x1b\x5b'+ code +'m'+bar+'\x1b\x5b0m\n\n');
	}

	this.run = function(display) {
		for(var test in tests) {
			try {
				runs += 1
				setUpCallback.call(this)
				tests[test].call(this)
				tearDownCallback.call(this)
			} catch (e) {
				failures += 1
				if(display == null) {
					print(test)
					print(e)
					print('\n')
				}
			}
		}
		
		if(display == null) {
			print(this.summary())
			print(this.bar())
		}
	}	
}