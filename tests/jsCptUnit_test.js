load('src/jsCptUnit.js')

function WasRun() {
	TestCase.call(this)

	this.wasRun = false;
	
	setup(function() {
		this.wasSetUp = true
	})
	
	teardown(function() {
		this.wasTearDown = true
	});

	test("change wasRun", function() {
		this.wasRun = true
	})
	
	test("change wasRunToo", function() {
		this.wasRunToo = true
	})
}

function ErrorTest() {
	TestCase.call(this)
	test('throw an exception', function() {
		throw('Exception')
	})
}

function TestCaseTest() {
	TestCase.call(this)

	setup(function() {
		test = new WasRun()
		test.run(false)
	}) 
	
	test("run tests", function() {
		assert(test.wasRun)		
	})
	
	test("summerize test results", function() {
		assertEqual("2 tests, 0 failed", test.summary())
	})
	
	test("run setUp", function() {
		assert(test.wasSetUp)
	})
	
	test("run all tests", function() {
		assert(test.wasRun)
		assert(test.wasRunToo)
	})
	
	test("run tearDown", function() {
		assert(test.wasTearDown)
	})
	
	test("catch failures", function() {
		test = new ErrorTest()
		test.run(false)
	})
	
	test("count failures", function() {
		test = new ErrorTest()
		test.run(false)
		assertEqual("1 tests, 1 failed", test.summary())
	})
	
	test('recognize assertEqual', function() {
		assertEqual(1, 1)
	})
	
	test('throw an exception when assertEqual gets different params', function() {
		try {
			assertEqual(2, 1)
			print('failure')
		} catch(e) {
			assertEqual('expected 2, got 1', e)
		}
	})
	
	test('recognize assert', function() {
		assert(true)
	})
	
	test('throw an exception when assert gets false', function() {
		try {
			assert(false)
			print(failure)
		} catch(e) {
			assertEqual('<false> is not true', e)
		}
	})
}
new TestCaseTest().run()
