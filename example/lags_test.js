load('jsCptUnit.js')
load('lags.js')

function LagsTest() {
	TestCase.call(this)
	
	setup(function() {
		company = new Company()		
		af514 = new Order('AF514', 0, 5, 10)
		af515 = new Order('AF515', 5, 9, 7)
		co5 = new Order('CO5', 3, 7, 14)
		ba01 = new Order('BA01', 6, 9, 8)
	})
	
	test("maximize profits for 0 order returns 0", function() {
		assertEqual(0, company.maximize_profits([]))
	})
	
	test("maximize_profits for 1 order returns its price", function() {
		assertEqual(10, company.maximize_profits([af514]))
		assertEqual(14, company.maximize_profits([co5]))
	})
	
	test("maximize_profits for 2 compatible orders sums their price", function() {
		assertEqual(17, company.maximize_profits([af514, af515]))
	})
	
	test("is_compatible_with when 2 orders are ok", function() {
		assert(af514.is_compatible_with(ba01))
	})
	
	test("is_compatible_with when 2 orders are not ok", function() {
		assert(!af514.is_compatible_with(co5))
	})
	
	test("is_compatible_with in the other order", function() {
		assert(ba01.is_compatible_with(af514))
		assert(!co5.is_compatible_with(af514))
	})
	
	test("maximize_profits for 2 compatible orders returns the highest price", function() {
		assertEqual(14, company.maximize_profits([co5, af514]))
	})
	
	test("acceptance test", function() {
		assertEqual(18, company.maximize_profits([af514, af515, co5, ba01]))
	})
	
}
new LagsTest().run()