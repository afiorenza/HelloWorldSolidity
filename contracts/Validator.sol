pragma solidity ^0.4.15;

contract TestList {
	address[] private _validatorArr = [0x9773412899495e7f6d1ad2ec5f489089b8ee50e0, 0xcb89d5b2b0bf8b06d939130aacd768dece8efd31];
  address[] private _pendingArr;
	mapping(address => uint) _indices;
	address public _disliked;
	bool private _finalized;

  event InitiateChange(bytes32 indexed _parent_hash, address[] _new_set);
  event ChangeFinalized(address[] current_set);

	function TestList() {
    for (uint i = 0; i < _validatorArr.length; i++) {
        _indices[_validatorArr[i]] = i;
    }
	}

	// Called on every block to update node validator list.
  function getValidators() constant returns (address[]) {
		return _validatorArr;
	}

	// Expand the list of validators.
	function addValidator(address validator) {
		_pendingArr.push(validator);
    initiateChange();
  }

	// Remove a validator from the list. TODO: terminar!
	function reportMalicious(address validator, uint blockNumber) {
		_pendingArr[_indices[validator]] = _pendingArr[_pendingArr.length-1];
		delete _indices[validator];
		delete _pendingArr[_pendingArr.length-1];
		_pendingArr.length--;
		InitiateChange(block.blockhash(block.number - 1), _pendingArr);
	}

	function reportBenign(address validator) {
    _disliked = validator;
	}

  function initiateChange() private {
		_finalized = false;
    InitiateChange(block.blockhash(block.number - 1), _pendingArr);
  }

	function finalizeChange() {
    _validatorArr = _pendingArr;
    _finalized = true;
    ChangeFinalized(_validatorArr);
  }
}
