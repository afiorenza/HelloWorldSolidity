pragma solidity ^0.4.13;

contract TestList {
  address[] private _validatorArr;
	address[] private _pendingArr = [0x58209ab738946fa645970c2c0999a8de0b16d49b];
	mapping(address => uint) _indices;
	address public _disliked;
	bool private _finalized;

  event InitiateChange(bytes32 indexed _parent_hash, address[] _new_set);
  event ChangeFinalized(address[] current_set);


	modifier when_finalized() {
		require (_finalized);
		_;
	}

	function TestList() {
		_validatorArr = _pendingArr;
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

	// Remove a validator from the list.
  function removeValidator(address value) returns (bool) {
    for (uint i = 0; i < _validatorArr.length; i++) {
      if (_validatorArr[i] == value) {
        for (uint j = i; j < _pendingArr.length - 1; j++) {
            _pendingArr[j] = _pendingArr[j + 1];
        }
        delete _pendingArr[_pendingArr.length - 1];
        _pendingArr.length--;
        initiateChange();
        return(true);
      } else {
        return(false);
      }
    }
  }

  function initiateChange() private when_finalized{
		_finalized = false;
    InitiateChange(block.blockhash(block.number - 1), _pendingArr);
  }

	function finalizeChange() {
    _validatorArr = _pendingArr;
    _finalized = true;
    ChangeFinalized(_validatorArr);
  }
}
