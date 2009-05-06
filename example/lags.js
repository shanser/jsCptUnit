function Company() {
	this.maximize_profits = function(orders) {
		if(orders.length == 0) {
			return 0;
		}
		first = orders.pop();
		var profits_with_first = first.price + this.maximize_profits(first.compatibles(orders));
		var profits_with_others = this.maximize_profits(orders)
		return Math.max(profits_with_others, profits_with_first)
	}
}

function Order(reference, start_time, duration, price) {
	this.price = price;
	this.start_time = start_time;
	this.duration = duration
	
	this.is_compatible_with = function(other) {
		return (other.start_time >= start_time + duration) || (start_time >= other.start_time + other.duration)
	}
	
	this.compatibles = function(orders) {
		compatibles = [];
		for(var i=0;i<orders.length;i++) {
			order = orders[i]
			if (first.is_compatible_with(order)) {
				compatibles.push(order)
			}
		}
		return compatibles;
	}
}