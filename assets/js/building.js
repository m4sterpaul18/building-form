$(function(){
	// checks if input is empty
	$('input,select').on('focusout',function(){
		$('input,select').each(function(){
		    if($(this).val() == ''){
		        $(this).css("border","1px solid red");
		    }
		    else{
		    	$(this).css("border","1px solid green");
			}
		})
	});

	// all input and select are required
	$('input,select').attr('required','');

	$('#to-form-1').on('click',function(){
		$('#form-1').show();
		$('#form-2').hide();
	})
	$('#to-form-2').on('click',function(){
		if(!$('#form-1 input').val()){
			alert('finish all inputs');
		}
		else{
			$('#form-1').hide(); 
			$('#form-2').show();
		}
		
	})

	//building age
	$('#date').on('focusout',function(){
		let date = new Date($('#date').val());
		$('#buildingAge').attr("value",buildingAge(date));
	});
	//generate floors 
	$('#generate').on('click',function(){
		let floorCount = $("#numOfStoreys").val();
		generateFloor(floorCount);
		$('#storeys').show();
	})
	//total SQM in each floors
	$('#totalSQM').on('click',function(){
		totalFloorSQM();
	})
	//probly duplicate
	$('#calculate-core').on('click',function(){
		const total = buildingCoreTotal();
		$('input[name="market-value"]').attr('value',total);
	})
	//additional items
	$('#add-items').on('click',function(){
		additionalItem();
	})
	//base value input
	$('#base-value').on('click',function(){
		$('#base-value').attr('value',getBaseValue());
	})
	//depreciation rate input
	$('#rate').on('click',function(){
		$('#rate').attr('value',getDepreciationRate());
	})
	//accumulated depreciation rate sub-total
	$('#total-depreciation').on('click',function(){
		console.log('clicked');
		$('#sub-total').attr('value',depreciationSubTotal());
	})


	// functions
	function buildingAge(date){
		let currentDate = new Date();
		let buildingAge = date.getFullYear();
		let currentYear = currentDate.getFullYear();

		const age = currentYear - buildingAge;
		return age;
	}

	function generateFloor(floorCount){
		$('#storeys').empty()
		for(var i=1; i <= floorCount ; i++){
			$('#storeys').hide().append(
				`<div>
					<label>Floor ${i} (sqm)</label>
					<input name="floors" type="number" class="form-control">
				</div>`
				).fadeIn('slow');
		}
	}

	function totalFloorSQM(){
		let total = 0;
		$('input[name="floors"]').each(function(){
			
			total += parseFloat($(this).val(),10);
		})
		$('#total-area').attr("value",total);
		$('#totalFloorSQM').attr("value",total);

	}

	function buildingCoreTotal(){
		const area = parseFloat($('#total-area').val());
		const baseValue = parseFloat($('#base-value').val());
		return Math.round(area * baseValue,2);
	}

	function additionalItem(){
		$('#additional-container').append(
					`<select class="form-control">
						<option value="carport">Carport-35%</option>
						<option value="porch">Porch-35%</option>
						<option value="balcony">Balcony-45%</option>
						<option value="garage-terrace">Garage Terrace-45%</option>
						<option value="covered">Covered-37%</option>
						<option value="roof-deck-dovered">Roof Deck Covered-60%</option>
						<option value="open">Open - 30%</option>
					</select>`);
	}

	function getBaseValue(){
		const buildingType = $('select[name="buildingType"]').val();
		const buildingClassi = $('select[name="buildingClassi"]').val();
		let baseValue = 0;

		switch(buildingType){
			case 'I-A': 
					if(buildingClassi == 'A'){
						return 1886.03;
					}
					else if(buildingClassi == 'B'){
						return baseValue = 2901.58;
					}
					else if(buildingClassi == 'H'){
						return baseValue = 2611.42
					}
					else{
						return 0;
					}
					break;
			case 'II-A':
					if(buildingClassi == 'A'){
						return baseValue = 4787.61;
					}
					else if(buildingClassi == 'B'){
						return baseValue = 4062.21;
					}
					else if(buildingClassi == 'C'){
						return baseValue = 4352.37;
					}
					else if(buildingClassi == 'D'){
						return baseValue = 5803.16;
					} 
					else if(buildingClassi == 'E'){
						return baseValue = 6198.83;
					} 
					else if(buildingClassi == 'H'){
						return baseValue = 3481.90;
					} 
					else{
						return 0;
					}
					break;
			case 'II-B': 
					if(buildingClassi == 'A'){
						return baseValue = 4352.37;
					}
					else if(buildingClassi == 'B'){
						return baseValue = 3626.98;
					}
					else if(buildingClassi == 'C'){
						return baseValue = 4062.21;
					}
					else if(buildingClassi == 'D'){
						return baseValue = 5513.00;
					}
					else if(buildingClassi == 'H'){
						return baseValue = 3191.74;
					} 
					else{
						return 0;
					}return 
					break;
			case 'III-A': 
					if(buildingClassi == 'A'){
						return baseValue = 9684.36;
					}
					else if(buildingClassi == 'B'){
						return baseValue = 6238.40;
					}
					else if(buildingClassi == 'C' || buildingClassi == 'D'){
						return baseValue = 7979.35;
					}
					else if(buildingClassi == 'E'){
						return baseValue = 7689.19;
					}
					else if(buildingClassi == 'F' || buildingClassi == 'G'){
						return baseValue = 5803.16;
					}
					else{
						return 0;
					}
					break;
			case 'III-B': 
					if(buildingClassi == 'A'){
						return baseValue = 9430.14;
					}
					else if(buildingClassi == 'B'){
						return baseValue = 5513.00;
					}
					else if(buildingClassi == 'C' || buildingClassi == 'D'){
						return baseValue = 7689.19;
					}
					else if(buildingClassi == 'E'){
						return baseValue = 7253.95;
					}
					else if(buildingClassi == 'F' || buildingClassi == 'G'){
						return baseValue = 5513.00;
					}
					else{
						return 0;
					}
					break;
			case 'III-C': 
					if(buildingClassi == 'A'){
						return baseValue = 6238.40;
					}
					else if(buildingClassi == 'B'){
						return baseValue = 6963.79;
					}
					else if(buildingClassi == 'C'){
						return baseValue = 6238.40;
					}
					else if(buildingClassi == 'D'){
						return baseValue = 7253.95;
					}
					else if(buildingClassi == 'E'){
						return baseValue = 7698.19;
					}
					else if(buildingClassi == 'F'){
						return baseValue = 5077.77;
					}
					else if(buildingClassi == 'H'){
						return baseValue = 4787.61;
					}
					else{
						return 0;
					}
					break;
			case 'III-D': 
					if(buildingClassi == 'A'){
						return baseValue = 5803.16;
					}
					else if(buildingClassi == 'B'){
						return baseValue = 6528.56;
					}
					else if(buildingClassi == 'C'){
						return baseValue = 5513.00;
					}
					else if(buildingClassi == 'D'){
						return baseValue = 6963.79;
					}
					else if(buildingClassi == 'E'){
						return baseValue = 7253.95;
					}
					else if(buildingClassi == 'F'){
						return baseValue = 4787.61;
					}
					else if(buildingClassi == 'H'){
						return baseValue = 4352.37;
					}
					else{
						return 0;
					}
					break;
			case 'III-E': 
					if(buildingClassi == 'A' || buildingClassi == 'B'){
						return baseValue = 5513.00;
					}
					else if(buildingClassi == 'C'){
						return baseValue = 5077.77;
					}
					else if(buildingClassi == 'D'){
						return baseValue = 6528.56;
					}
					else if(buildingClassi == 'E'){
						return baseValue = 6963.79;
					}
					else if(buildingClassi == 'F'){
						return baseValue = 4352.37;
					}
					else if(buildingClassi == 'H'){
						return baseValue = 4062.21;
					}
					else{
						return 0;
					}
					break;
			case 'III-F': 
					if(buildingClassi == 'A' || buildingClassi == 'B'){
						return baseValue = 5077.77;
					}
					else if(buildingClassi == 'C'){
						return baseValue = 4431.50;
					}
					else if(buildingClassi == 'D'){
						return baseValue = 6238.40;
					}
					else if(buildingClassi == 'E'){
						return baseValue = 6528.56;
					}
					else if(buildingClassi == 'F'){
						return baseValue = 4062.21;
					}
					else if(buildingClassi == 'H'){
						return baseValue = 3772.05;
					}
					else{
						return 0;
					}
					break;
			case 'IV-A': 
					if(buildingClassi == 'A'){
						return baseValue = 10590.77;
					}
					else if(buildingClassi == 'B'){
						return baseValue = 7253.95;
					}
					else if(buildingClassi == 'C'){
						return baseValue = 8704.74;
					}
					else if(buildingClassi == 'D'){
						return baseValue = 9865.37;
					}
					else if(buildingClassi == 'E'){
						return baseValue = 8414.58;
					}
					else if(buildingClassi == 'F' || buildingClassi == 'G'){
						return baseValue = 6528.56;
					}
					else{
						return 0;
					}
					break;
			case 'IV-B': 
					if(buildingClassi == 'A'){
						return baseValue = 10155.53;
					}
					else if(buildingClassi == 'B'){
						return baseValue = 6963.79;
					}
					else if(buildingClassi == 'C' || buildingClassi == 'D'){
						return baseValue = 8414.58;
					}
					else if(buildingClassi == 'E'){
						return baseValue = 7979.35;
					}
					else if(buildingClassi == 'F' || buildingClassi == 'G'){
						return baseValue = 6238.40;
					}
					else{
						return 0;
					}
					break;
			case 'V-A': 
					if(buildingClassi == 'A'){
						return baseValue = 12331.72;
					}
					else if(buildingClassi == 'B'){
						return baseValue = 10590.77;
					}
					else if(buildingClassi == 'C' || buildingClassi == 'E'){
						return baseValue = 9865.37;
					}
					else if(buildingClassi == 'D'){
						return baseValue = 8704.74;
					}
					else if(buildingClassi == 'F'){
						return baseValue = 7253.95;
					}
					else if(buildingClassi == 'G'){
						return baseValue = 7689.19;
					}
					else{
						return 0;
					}
					break;
			case 'V-B': 
					if(buildingClassi == 'A'){
						return baseValue = 12041.56;
					}
					else if(buildingClassi == 'B'){
						return baseValue = 9865.37;
					}
					else if(buildingClassi == 'C'){
						return baseValue = 9139.98;
					}
					else if(buildingClassi == 'D'){
						return baseValue = 8414.58;
					}
					else if(buildingClassi == 'E'){
						return baseValue = 9430.14;
					}
					else if(buildingClassi == 'F'){
						return baseValue = 6963.79;
					}
					else if(buildingClassi == 'G'){
						return baseValue = 7253.95;
					}
					else{
						return 0;
					}
					break;
			case 'V-C': 
					if(buildingClassi == 'A'){
						return baseValue = 10880.93;
					}
					else if(buildingClassi == 'B'){
						return baseValue = 9430.14;
					}
					else if(buildingClassi == 'C'){
						return baseValue = 8414.58;
					}
					else if(buildingClassi == 'D'){
						return baseValue = 7979.35;
					}
					else if(buildingClassi == 'E'){
						return baseValue = 9139.98;
					}
					else if(buildingClassi == 'F'){
						return baseValue = 6528.56;
					}
					else if(buildingClassi == 'G'){
						return baseValue = 6963.79;
					}
					else{
						return 0;
					}
					break;
			default:
					return 0;
		}
	}

	function getDepreciationRate(){
		const year = $('#buildingAge').val();
		const type = $('select[name="buildingType"]').val();

		switch(type){
			case 'I-A':
				if(year >= 1 && year <= 5){
					return 0.052;
				}
				else if(year >= 6 && year <= 10){
					return 0.046;
				}
				else if(year >= 11 && year <= 15){
					return 0.040;
				}
				else if(year >= 16 && year <= 20){
					return 0.034;
				}	
				else if(year >= 21){
					return 0.032;
				}
				else{
					alert('Please input date completed and structural type');
				}
				break;
			case 'II-A':
				if(year >= 1 && year <= 5){
					return 0.050;
				}
				else if(year >= 6 && year <= 10){
					return 0.042;
				}
				else if(year >= 11 && year <= 15){
					return 0.036;
				}
				else if(year >= 16 && year <= 20){
					return 0.032;
				}	
				else if(year >= 21){
					return 0.032;
				}
				else{
					alert('Please input date completed and structural type');
				}
				break;
			case 'II-B':
				if(year >= 1 && year <= 5){
					return 0.050;
				}
				else if(year >= 6 && year <= 10){
					return 0.040;
				}
				else if(year >= 11 && year <= 15){
					return 0.034;
				}
				else if(year >= 16 && year <= 20){
					return 0.030;
				}	
				else if(year >= 21){
					return 0.030;
				}
				else{
					alert('Please input date completed and structural type');
				}
				break;
			case 'III-A':
			case 'III-B':
				if(year >= 1 && year <= 5){
					return 0.040;
				}
				else if(year >= 6 && year <= 10){
					return 0.036;
				}
				else if(year >= 11 && year <= 15){
					return 0.032;
				}
				else if(year >= 16 && year <= 20){
					return 0.030;
				}	
				else if(year >= 21){
					return 0.025;
				}
				else{
					alert('Please input date completed and structural type');
				}
				break;
			case 'III-C':
			case 'III-D':
				if(year >= 1 && year <= 5){
					return 0.040;
				}
				else if(year >= 6 && year <= 10){
					return 0.035;
				}
				else if(year >= 11 && year <= 15){
					return 0.030;
				}
				else if(year >= 16 && year <= 20){
					return 0.025;
				}	
				else if(year >= 21){
					return 0.020;
				}
				else{
					alert('Please input date completed and structural type');
				}
				break;
			case 'III-E':
				if(year >= 1 && year <= 5){
					return 0.040;
				}
				else if(year >= 6 && year <= 10){
					return 0.035;
				}
				else if(year >= 11 && year <= 15){
					return 0.030;
				}
				else if(year >= 16 && year <= 20){
					return 0.025;
				}	
				else if(year >= 21){
					return 0.020;
				}
				else{
					alert('Please input date completed and structural type');
				}
				break;
			case 'IV-A':
				if(year >= 1 && year <= 5){
					return 0.026;
				}
				else if(year >= 6 && year <= 10){
					return 0.023;
				}
				else if(year >= 11 && year <= 15){
					return 0.022;
				}
				else if(year >= 16 && year <= 20){
					return 0.020;
				}	
				else if(year >= 21){
					return 0.016;
				}
				else{
					alert('Please input date completed and structural type');
				}
				break;
			case 'IV-B':
				if(year >= 1 && year <= 5){
					return 0.024;
				}
				else if(year >= 6 && year <= 10){
					return 0.022;
				}
				else if(year >= 11 && year <= 15){
					return 0.020;
				}
				else if(year >= 16 && year <= 20){
					return 0.017;
				}	
				else if(year >= 21){
					return 0.014;
				}
				else{
					alert('Please input date completed and structural type');
				}
				break;
			case 'V-A':
				if(year >= 1 && year <= 5){
					return 0.022;
				}
				else if(year >= 6 && year <= 10){
					return 0.020;
				}
				else if(year >= 11 && year <= 15){
					return 0.017;
				}
				else if(year >= 16 && year <= 20){
					return 0.013;
				}	
				else if(year >= 21){
					return 0.011;
				}
				else{
					alert('Please input date completed and structural type');
				}
				break;
			case 'V-B':
				if(year >= 1 && year <= 5){
					return 0.020;
				}
				else if(year >= 6 && year <= 10){
					return 0.018;
				}
				else if(year >= 11 && year <= 15){
					return 0.015;
				}
				else if(year >= 16 && year <= 20){
					return 0.012;
				}	
				else if(year >= 21){
					return 0.010;
				}
				else{
					alert('Please input date completed and structural type');
				}
				break;
			case 'V-C':
				if(year >= 1 && year <= 5){
					return 0.018;
				}
				else if(year >= 6 && year <= 10){
					return 0.014;
				}
				else if(year >= 11 && year <= 15){
					return 0.012;
				}
				else if(year >= 16 && year <= 20){
					return 0.010;
				}	
				else if(year >= 21){
					return 0.010;
				}
				else{
					alert('Please input date completed and structural type');
				}
				break;
			default:
				alert('Please input date completed and structural type');

		}
	}

	function depreciationSubTotal(){
		let marketValue = $('input[name="market-value"]').val();
		let rate = $('input[name="rate"]').val();

		return marketValue - (marketValue * rate);
	}

})