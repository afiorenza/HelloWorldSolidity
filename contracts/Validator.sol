pragma solidity ^0.4.6;

contract TestList {
	address[] private validatorArr = [0x2d66f6e87128ab032c7bd9c771ed221fe3800b40, 0xa3480dfe78a37bc77ee2ba03a181dfa869d8df4c];
  address[] private pendingArr;
	mapping(address => uint) indices;
	address public disliked;
	bool private finalized;

  event InitiateChange(bytes32 indexed _parent_hash, address[] _new_set);
  event ChangeFinalized(address[] current_set);

	function TestList() {
    for (uint i = 0; i < validatorArr.length; i++) {
        indices[validatorArr[i]] = i;
    }
	}

	// Called on every block to update node validator list.
  function get() constant returns (address[]) {
		return validatorArr;
	}

	// Expand the list of validators.
	function addValidator(address validator) {
		pendingArr.push(validator);
    initiateChange();
  }

	// Remove a validator from the list. TODO: terminar!
	function reportMalicious(address validator, uint blockNumber, bytes proof) {
		validatorArr[indices[validator]] = validatorArr[validatorArr.length-1];
		delete indices[validator];
		delete validatorArr[validatorArr.length-1];
		validatorArr.length--;
	}

	function reportBenign(address validator, uint blockNumber) {
    disliked = validator;
	}

  function initiateChange() private {
		finalized = false;
    InitiateChange(block.blockhash(block.number - 1), pendingArr);
  }

	function finalizeChange() {
    validatorArr = pendingArr;
    finalized = true;
    ChangeFinalized(validatorArr);
  }
}
