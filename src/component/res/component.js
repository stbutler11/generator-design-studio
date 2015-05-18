/* global sap */
/* jshint strict: false, quotmark:false */
sap.designstudio.sdk.Component.subclass("com.sap.sample.simplecrosstab.SimpleCrosstab", function() {

	var CSS_CLASS_DIV = "sapzencrosstab-TableDiv";
	var CSS_CLASS_TABLE = "sapzencrosstab-Crosstab";
	var CSS_CLASS_TR = "sapzencrosstab-HeaderRow sapzencrosstab-DimensionHeaderArea";
	var CSS_CLASS_TD_HEADER = "sapzencrosstab-HeaderCellDefault";
	var CSS_CLASS_TD_HEADER_BOLD = "sapzencrosstab-HeaderCellDefault sapzencrosstab-HeaderCellTotal";
	var CSS_CLASS_TD_DEFAULT_EVEN = "sapzencrosstab-DataCellDefault";
	var CSS_CLASS_TD_DEFAULT_ODD = "sapzencrosstab-DataCellDefault sapzencrosstab-DataCellAlternating";
	var CSS_CLASS_TD_DEFAULT_BOLD_EVEN = "sapzencrosstab-DataCellDefault sapzencrosstab-DataCellTotal";
	var CSS_CLASS_TD_DEFAULT_BOLD_ODD = "sapzencrosstab-DataCellDefault sapzencrosstab-DataCellTotal sapzencrosstab-DataCellAlternating";

	var CSS_CLASS_TD_DEFAULT_EXCEPTION1 = "sapzencrosstab-DataCellDefault sapzencrosstab-DataCellAlert1Background";
	var CSS_CLASS_TD_DEFAULT_EXCEPTION2 = "sapzencrosstab-DataCellDefault sapzencrosstab-DataCellAlert2Background";
	var CSS_CLASS_TD_DEFAULT_EXCEPTION3 = "sapzencrosstab-DataCellDefault sapzencrosstab-DataCellAlert3Background";
	var CSS_CLASS_TD_DEFAULT_EXCEPTION4 = "sapzencrosstab-DataCellDefault sapzencrosstab-DataCellAlert4Background";        
	var CSS_CLASS_TD_DEFAULT_EXCEPTION5 = "sapzencrosstab-DataCellDefault sapzencrosstab-DataCellAlert5Background";
	var CSS_CLASS_TD_DEFAULT_EXCEPTION6 = "sapzencrosstab-DataCellDefault sapzencrosstab-DataCellAlert6Background";
	var CSS_CLASS_TD_DEFAULT_EXCEPTION7 = "sapzencrosstab-DataCellDefault sapzencrosstab-DataCellAlert7Background";
	var CSS_CLASS_TD_DEFAULT_EXCEPTION8 = "sapzencrosstab-DataCellDefault sapzencrosstab-DataCellAlert8Background";        
	var CSS_CLASS_TD_DEFAULT_EXCEPTION9 = "sapzencrosstab-DataCellDefault sapzencrosstab-DataCellAlert9Background";

	var CSS_CLASS_TD_DEFAULT_BOLD_EXCEPTION1 = "sapzencrosstab-DataCellDefault sapzencrosstab-DataCellAlert1Background sapzencrosstab-DataCellTotal";
	var CSS_CLASS_TD_DEFAULT_BOLD_EXCEPTION2 = "sapzencrosstab-DataCellDefault sapzencrosstab-DataCellAlert2Background sapzencrosstab-DataCellTotal";
	var CSS_CLASS_TD_DEFAULT_BOLD_EXCEPTION3 = "sapzencrosstab-DataCellDefault sapzencrosstab-DataCellAlert3Background sapzencrosstab-DataCellTotal";
	var CSS_CLASS_TD_DEFAULT_BOLD_EXCEPTION4 = "sapzencrosstab-DataCellDefault sapzencrosstab-DataCellAlert4Background sapzencrosstab-DataCellTotal";        
	var CSS_CLASS_TD_DEFAULT_BOLD_EXCEPTION5 = "sapzencrosstab-DataCellDefault sapzencrosstab-DataCellAlert5Background sapzencrosstab-DataCellTotal";
	var CSS_CLASS_TD_DEFAULT_BOLD_EXCEPTION6 = "sapzencrosstab-DataCellDefault sapzencrosstab-DataCellAlert6Background sapzencrosstab-DataCellTotal";
	var CSS_CLASS_TD_DEFAULT_BOLD_EXCEPTION7 = "sapzencrosstab-DataCellDefault sapzencrosstab-DataCellAlert7Background sapzencrosstab-DataCellTotal";
	var CSS_CLASS_TD_DEFAULT_BOLD_EXCEPTION8 = "sapzencrosstab-DataCellDefault sapzencrosstab-DataCellAlert8Background sapzencrosstab-DataCellTotal";        
	var CSS_CLASS_TD_DEFAULT_BOLD_EXCEPTION9 = "sapzencrosstab-DataCellDefault sapzencrosstab-DataCellAlert9Background sapzencrosstab-DataCellTotal";

	var CSS_CLASS_COLLAPSE_NODE = "sapzencrosstab-CollapseNode";
	var CSS_CLASS_EXPAND_NODE = "sapzencrosstab-ExpandNode";
	var CSS_CLASS_HIERARCHY = "sapzencrosstab-HeaderCellDivHierarchy";
	var CSS_CLASS_SELECT_DATA_CELL = "sapzencrosstab-DataCellSelectData";
	var CSS_CLASS_HOVER_ROW_HEADER_CELL = "sapzencrosstab-HoverDataCell";
	var CSS_CLASS_HEADER_CELL_DEFAULT = "sapzencrosstab-HeaderCellDefault";

	var DATA_DIM = "data-dim-";

	var that = this;

	var data = null;
	var visSelection = {};

	var iNumColTupleElements = 0;
	var iNumRowTupleElements = 0;

	var iNumDataCols = 0;
	var iNumDataRows = 0;

	var iNumGridCols = 0;
	var iNumGridRows = 0;

	var iNumGridColTupleElements = 0;
	var iNumGridRowTupleElements = 0;

	var aGridColspan = [];
	var aGridRowspan = [];
	var aGridText = [];
	var aGridType = [];
	var aGridDataAttributes = [];
	
	var jqTable;
	
	this.init = function() {
		this.$().addClass(CSS_CLASS_DIV);
		this.$().css("overflow-x", "scroll");
		this.$().css("overflow-y", "scroll");
	};

	this.afterUpdate = function() {
		if (data && data.formattedData && data.formattedData.length > 0) {
			computeTableLayout();

			aGridColspan = newArray(iNumGridCols, iNumGridRows);
			aGridRowspan = newArray(iNumGridCols, iNumGridRows);
			aGridText = newArray(iNumGridCols, iNumGridRows);
			aGridType = newArray(iNumGridCols, iNumGridRows);
			aGridDataAttributes = newArray(iNumGridCols, iNumGridRows);

			applyTopLeftCorner();
			applyColumnHeaders();
			applyRowHeaders();
			applyData();

			renderTable();
		}
	};

	function computeTableLayout() {
		iNumDataCols = data.columnCount;
		iNumDataRows = data.rowCount;
		
		iNumColTupleElements = 0;
		iNumRowTupleElements = 0;
		
		for (var i = 0; i < data.dimensions.length; i++) {
			var oDim = data.dimensions[i];
			var sDimAxis = oDim.axis;
			if (sDimAxis === "COLUMNS") {
				iNumColTupleElements++;
			} else if (sDimAxis === "ROWS") {
				iNumRowTupleElements++;
			}
		}
		
		iNumGridColTupleElements = 0;
		for (var i = 0; i < iNumColTupleElements; i++) {
			var oColDim = data.dimensions[i];
			iNumGridColTupleElements += 1 + countAttributes(oColDim);
		}

		var DIM_OFFSET = iNumColTupleElements;
		iNumGridRowTupleElements = 0;
		for (var i = 0; i < iNumRowTupleElements; i++) {
			var oRowDim = data.dimensions[DIM_OFFSET + i];
			iNumGridRowTupleElements += 1 + countAttributes(oRowDim);
		}

		iNumGridCols = iNumGridRowTupleElements + iNumDataCols;
		iNumGridRows = iNumGridColTupleElements + iNumDataRows;
	}

	function newArray(iWidth, iHeight) {
		var array = new Array(iWidth);
		for (var i = 0; i < iWidth; i++) {
			array[i] = new Array(iHeight);
		}
		return array;
	}

	function applyTopLeftCorner() {
		spanCell(0, 0, iNumGridRowTupleElements - 1, iNumGridColTupleElements - 1, "", "topleft");
		
		// row headers
		var iGridRow = iNumGridColTupleElements - 1;
		var DIM_OFFSET = iNumColTupleElements;

		var iGridCol = 0;
		for (var iRowTupleElementIndex = 0; iRowTupleElementIndex < iNumRowTupleElements; iRowTupleElementIndex++) {
			var oColDim = data.dimensions[DIM_OFFSET + iRowTupleElementIndex];
			var sGridText = (oColDim.containsMeasures) ? "" : oColDim.text;
			spanCell(iGridCol, iGridRow, 1, 1, sGridText, "header");
			var iNumColAttributes = countAttributes(oColDim);
			if (iNumColAttributes > 0) {
				for (var i = 0; i < iNumColAttributes; i++) {
					sGridText = oColDim.attributes[i].text;
					var iGridColFull = iGridCol + (1 + i);
					spanCell(iGridColFull, iGridRow, 1, 1, sGridText, "header");
				}
			}
			iGridCol += 1 + iNumColAttributes;
		}
		
		// column header
		var iGridCol = iNumGridRowTupleElements - 1;
		var OFFSET_COLS = iNumGridRowTupleElements;

		var iGridRow = 0;
		for (var iColTupleElementIndex = 0; iColTupleElementIndex < iNumColTupleElements; iColTupleElementIndex++) {
			var oRowDim = data.dimensions[iColTupleElementIndex];
			var sGridText = (oRowDim.containsMeasures) ? "" : oRowDim.text;
			spanCell(iGridCol, iGridRow, 1, 1, sGridText, "header");
            var iNumRowAttributes = countAttributes(oRowDim); 
			if (iNumRowAttributes > 0) {
				for (var i = 0; i < iNumRowAttributes; i++) {
					sGridText = oRowDim.attributes[i].text;
					var iGridRowFull = iGridRow + (1 + i);
					spanCell(iGridCol, iGridRowFull, 1, 1, sGridText, "header");
				}
			}
			iGridRow += 1 + iNumRowAttributes;			
		}
		
		// bottom-right cell
		var iGridCol = iNumGridRowTupleElements - 1;
		var iGridRow = iNumGridColTupleElements - 1;
		
		var DIM_OFFSET = iNumColTupleElements;

		var oLastColDim = data.dimensions[DIM_OFFSET - 1];
		var oLastRowDim = data.dimensions[data.dimensions.length - 1];

		var bLastColDimContainsMeasures = (oLastColDim.containsMeasures === true);
		var bLastRowDimContainsMeasures = (oLastRowDim.containsMeasures === true);

		var sLastColText = oLastColDim.text;
		var iNumColDimAttributes = countAttributes(oLastColDim);
		if (iNumColDimAttributes > 0) {
		  sLastColText = oLastColDim.attributes[iNumColDimAttributes - 1].text;
		}

		var sLastRowText = oLastRowDim.text;
		var iNumRowDimAttributes = countAttributes(oLastRowDim);
		if (iNumRowDimAttributes > 0) {
		  sLastRowText = oLastRowDim.attributes[iNumRowDimAttributes - 1].text;
		}

		var sGridText = "";
		if ((bLastColDimContainsMeasures === false) && (bLastRowDimContainsMeasures === false)) {
		  sGridText = sLastRowText + " | " + sLastColText;
		} else if ((bLastColDimContainsMeasures === false) && bLastRowDimContainsMeasures) {
		  sGridText = sLastColText;
		} else if (bLastColDimContainsMeasures && (bLastRowDimContainsMeasures === false)) {
		  sGridText = sLastRowText;
		}

		spanCell(iGridCol, iGridRow, 1, 1, sGridText, "header");
	}

	function spanCell(iGridCol, iGridRow, iGridColspan, iGridRowspan, sGridText, sGridType, sGridDataAttributes) {
		for (var i = iGridRow; i < iGridRow + iGridRowspan; i++) {
			for (var j = iGridCol; j < iGridCol + iGridColspan; j++) {
				aGridColspan[j][i] = -1;
				aGridRowspan[j][i] = -1;
			}
		}
		
		aGridColspan[iGridCol][iGridRow] = iGridColspan;
		aGridRowspan[iGridCol][iGridRow] = iGridRowspan;
		aGridText[iGridCol][iGridRow] = sGridText;
		aGridType[iGridCol][iGridRow] = sGridType;
		aGridDataAttributes[iGridCol][iGridRow] = sGridDataAttributes;
	}
	
	function isCellHiddenBySpan(iGridCol, iGridRow) {
		var iGridColspan = aGridColspan[iGridCol][iGridRow];
		if (iGridColspan === -1) {
			return true;
		}
		var iGridRowspan = aGridRowspan[iGridCol][iGridRow];
		if (iGridRowspan === -1) {
			return true;
		}
		return false;
	}

	function getHeaderText(oMember) {
		var sGridText = "";
		var iLevel = oMember.level;
		if (iLevel) {
			var NBSP = "&nbsp;";

			for (var i = 0; i < iLevel; i++) {
				sGridText += NBSP + NBSP;
			}
			var sCssClass = "";
			var sNodeState = oMember.nodeState;
			if (sNodeState) {
				sCssClass = (sNodeState === "EXPANDED") ? CSS_CLASS_COLLAPSE_NODE : CSS_CLASS_EXPAND_NODE;
			}
			sGridText += "<span style=\"display: inline-block; vertical-align: middle\" class=\"" + CSS_CLASS_HIERARCHY + " " + sCssClass + "\"></span>";
			sGridText += NBSP;
		} 
		return sGridText + oMember.text;
	}

	function applyColumnHeaders() {
		var OFFSET_COLS = iNumGridRowTupleElements;
		
		var iGridRow = 0;
		for (var iColTupleElementIndex = 0; iColTupleElementIndex < iNumColTupleElements; iColTupleElementIndex++) {
			var iDimIndex = iColTupleElementIndex;
			var oRowDim = data.dimensions[iDimIndex];
			for (var iCol = 0; iCol < iNumDataCols; iCol++) {
				var iGridCol = OFFSET_COLS + iCol;
				if (isCellHiddenBySpan(iGridCol, iGridRow) === false) {
					var iGridColspan = computeColHeaderColspan(iCol, iColTupleElementIndex);
					var iGridRowspan = computeColHeaderRowspan(iCol, iColTupleElementIndex);  // includes attribute count
					
					var iMemberIndex = data.axis_columns[iCol][iDimIndex];
					var oColMember = oRowDim.members[iMemberIndex];
					var sGridText = getHeaderText(oColMember);
					var sGridType = (oColMember.type === "RESULT") ? "header-bold" : "header";
					var sGridDataAttribs = DATA_DIM + iDimIndex + "=" + iMemberIndex;
					
					spanCell(iGridCol, iGridRow, iGridColspan, iGridRowspan, sGridText, sGridType, sGridDataAttribs);
					
					if (oColMember.type !== "RESULT") {
						var iNumColAttributeMembers = countAttributeMembers(oColMember);
						if (iNumColAttributeMembers > 0) {
							for (var i = 0; i < iNumColAttributeMembers; i++) {
								sGridText = oColMember.attributeMembers[i].text;
								var iGridRowFull = iGridRow + (1 + i);
								spanCell(iGridCol, iGridRowFull, iGridColspan, iGridRowspan, sGridText, "header", sGridDataAttribs);
							}
						}
					}
					iCol += iGridColspan - 1; // grid colspan is equivalent to model colspan
				}
			}
			iGridRow += 1 + countAttributes(oRowDim);			
		}
	}

	function computeColHeaderColspan(iCol, iColTupleElementIndex) {
		var iGridColspan = 1;
		
		var iDimIndex = iColTupleElementIndex;
		var iIndex = data.axis_columns[iCol][iDimIndex];
		for (var i = iCol + 1; i < data.axis_columns.length; i++) { 		
			var iNextIndex = data.axis_columns[i][iDimIndex];
			if (iIndex === iNextIndex) {
				// end colspan if "parent" tuples of next column are not the same
				for (var j = 0; j < iColTupleElementIndex; j++) {
					var iNextDimIndex = j; 
					var iParentIndex = data.axis_columns[iCol][iNextDimIndex];
					var iParentIndexToCompare = data.axis_columns[i][iNextDimIndex];
					if (iParentIndex !== iParentIndexToCompare) {
						return iGridColspan;
					}
				}
				iGridColspan++;
			} else {
				break;
			}
		}
		return iGridColspan;
	}

	function computeColHeaderRowspan(iCol, iColTupleElementIndex) {
		var iGridRowspan = 1;
		
		var iDimIndex = iColTupleElementIndex;
		var oColDim = data.dimensions[iDimIndex];
		var oColMember = oColDim.members[data.axis_columns[iCol][iDimIndex]];
		
		if (oColMember.type === "RESULT") {
			iGridRowspan += countAttributes(oColDim);
			
			for (var i = iColTupleElementIndex + 1; i < iNumColTupleElements; i++) {
				var iNextDimIndex = i;
				var oNextColDim = data.dimensions[iNextDimIndex];
				var oColMemberToCompare = oNextColDim.members[data.axis_columns[iCol][iNextDimIndex]];
				if (oColMemberToCompare.type === "RESULT") {
					iGridRowspan += 1 + countAttributes(oNextColDim);
				} else {
					break;
				}
			}
		}
		return iGridRowspan;
	}
	
	function applyRowHeaders() {
		var DIM_OFFSET = iNumColTupleElements;
		var OFFSET_ROWS = iNumGridColTupleElements;

		var iGridCol = 0;
		for (var iRowTupleElementIndex = 0; iRowTupleElementIndex < iNumRowTupleElements; iRowTupleElementIndex++) {
			var iDimIndex = DIM_OFFSET + iRowTupleElementIndex;
			var oColDim = data.dimensions[iDimIndex];			
			for (var iRow = 0; iRow < iNumDataRows; iRow++) {
				var iGridRow = OFFSET_ROWS + iRow;
				if (isCellHiddenBySpan(iGridCol, iGridRow) === false) {
					var iGridColspan = computeRowHeaderColspan(iRowTupleElementIndex, iRow);  // includes attribute count
					var iGridRowspan = computeRowHeaderRowspan(iRowTupleElementIndex, iRow);
					
					var iMemberIndex = data.axis_rows[iRow][iDimIndex];
					var oRowMember = oColDim.members[iMemberIndex];
					var sGridText = getHeaderText(oRowMember);
					var sGridType = (oRowMember.type === "RESULT") ? "header-bold" : "header";
					var sGridDataAttribs = DATA_DIM + iDimIndex + "=" + iMemberIndex;
					
					spanCell(iGridCol, iGridRow, iGridColspan, iGridRowspan, sGridText, sGridType, sGridDataAttribs);
					
					if (oRowMember.type !== "RESULT") {
						var iNumRowAttributeMembers = countAttributeMembers(oRowMember); 
						if (iNumRowAttributeMembers > 0) {
							for (var i = 0; i < iNumRowAttributeMembers; i++) {
								sGridText = oRowMember.attributeMembers[i].text;
								var iGridColFull = iGridCol + (1 + i);
								spanCell(iGridColFull, iGridRow, iGridColspan, iGridRowspan, sGridText, "header", sGridDataAttribs);
							}
						}
					}
					iRow += iGridRowspan - 1;  // grid rowspan is equivalent to data model rowspan
				}
			}
			iGridCol += 1 + countAttributes(oColDim);
		}
	}	
	
	function computeRowHeaderColspan(iRowTupleElementIndex, iRow) {
		var DIM_OFFSET = iNumColTupleElements;
		
		var iGridColspan = 1;
		
		var iDimIndex = DIM_OFFSET + iRowTupleElementIndex;
		var oRowDim = data.dimensions[iDimIndex];
		var oRowMember = oRowDim.members[data.axis_rows[iRow][iDimIndex]];
		
		if (oRowMember.type === "RESULT") {
			iGridColspan += countAttributes(oRowDim);

			for (var i = iRowTupleElementIndex + 1; i < iNumRowTupleElements; i++) {
				var iNextDimIndex = DIM_OFFSET + i;
				var oNextRowDim = data.dimensions[iNextDimIndex];
				var oRowMemberToCompare = oNextRowDim.members[data.axis_rows[iRow][iNextDimIndex]];
				if (oRowMemberToCompare.type === "RESULT") {
					iGridColspan += 1 + countAttributes(oNextRowDim);
				} else {
					break;
				}
			}
		}
		return iGridColspan;
	}

	function computeRowHeaderRowspan(iRowTupleElementIndex, iRow) {
		var DIM_OFFSET = iNumColTupleElements;
		
		var iGridRowspan = 1;
		
		var iDimIndex = DIM_OFFSET + iRowTupleElementIndex;
		var iIndex = data.axis_rows[iRow][iDimIndex];
		for (var i = iRow + 1; i < data.axis_rows.length; i++) {
			var iNextIndex = data.axis_rows[i][iDimIndex];
			if (iIndex == iNextIndex) {
				// end rowspan if "parent" tuples of next row are not the same
				for (var j = 0; j < iRowTupleElementIndex; j++) {
					var iNextDimIndex = DIM_OFFSET + j;
					var iParentIndex = data.axis_rows[iRow][iNextDimIndex];
					var iNextParentIndex = data.axis_rows[i][iNextDimIndex];
					if (iParentIndex !== iNextParentIndex) {
						return iGridRowspan;
					}
				}
				iGridRowspan++;
			} else {
				break;
			}
		}
		return iGridRowspan;
	}

	function applyData() {
		var OFFSET_COLS = iNumGridRowTupleElements;
		var OFFSET_ROWS = iNumGridColTupleElements;
		
		var iDataIndex = 0;
		for (var iRow = 0; iRow < iNumDataRows; iRow++) {
			for (var iCol = 0; iCol < iNumDataCols; iCol++) {
				var iGridCol = OFFSET_COLS + iCol;
				var iGridRow = OFFSET_ROWS + iRow;
				var sGridText = data.formattedData[iDataIndex];
				var sGridType = computeTypeOfData(iCol, iRow, iDataIndex);
				var sGridDataAttribs = computeDataAttributes(data.tuples[iDataIndex]);

				spanCell(iGridCol, iGridRow, 1, 1, sGridText, sGridType, sGridDataAttribs);
				iDataIndex++;
			}
		}
	}

	function computeTypeOfData(iCol, iRow, iDataIndex) {
		var iExceptionLevel = getExceptionLevel(iDataIndex);

		if (isResultData(iCol, iRow)) {
			if (iExceptionLevel > 0) {
				return "data-bold-exception" + iExceptionLevel;
			}
			return (iRow % 2 === 0) ? "data-bold-even" : "data-bold-odd";
		}
		if (iExceptionLevel > 0) {
			return "data-exception" + iExceptionLevel;
		}
		return (iRow % 2 === 0) ? "data-even" : "data-odd";
	}

	function getExceptionLevel(iDataIndex) {
		if (data.conditionalFormatValues) {
			var oCondFormat = data.conditionalFormatValues[iDataIndex];
			if (oCondFormat) {
				var iMaxExceptionLevel = -1;
				for (var sProp in oCondFormat) {
					if (oCondFormat.hasOwnProperty(sProp)) {
						var iExceptionLevel = oCondFormat[sProp];
						if (iExceptionLevel > iMaxExceptionLevel) {
							iMaxExceptionLevel = iExceptionLevel;
						}
					}
				}
				return iMaxExceptionLevel;
			}
		}
		return -1;
	}	
	
	function computeDataAttributes(oTuple) {
		var sResult = "";
		for (var i = 0; i < oTuple.length; i++) {
			if (i > 0) {
				sResult += " ";
			}
			// sResult += DATA_DIM + i + "=" + oTuple[i];
			sResult += DATA_DIM + i + "=" + oTuple[i];
		}
		return sResult;
	}

	function isResultData(iCol, iRow) {
		var oColTuple = data.axis_columns[iCol];
		for (var i = 0; i < iNumColTupleElements; i++) {
			var oColMember = data.dimensions[i].members[oColTuple[i]];
			if (oColMember.type === "RESULT") {
				return true;
			}
		}
		var DIM_OFFSET = iNumColTupleElements;
		var oRowTuple = data.axis_rows[iRow];
		for (var i = 0; i < iNumRowTupleElements; i++) {
			var oRowMember = data.dimensions[DIM_OFFSET + i].members[oRowTuple[DIM_OFFSET + i]];
			if (oRowMember.type === "RESULT") {
				return true;
			}
		}
		return false;
	}

	var MAP_TYPE_TO_CSS_CLASS = {
			"topleft": CSS_CLASS_TD_HEADER,
			"header": CSS_CLASS_TD_HEADER,
			"header-bold": CSS_CLASS_TD_HEADER_BOLD,
			"data-odd": CSS_CLASS_TD_DEFAULT_ODD,
			"data-bold-odd": CSS_CLASS_TD_DEFAULT_BOLD_ODD,
			"data-even": CSS_CLASS_TD_DEFAULT_EVEN,
			"data-bold-even": CSS_CLASS_TD_DEFAULT_BOLD_EVEN,
			"data-exception1": CSS_CLASS_TD_DEFAULT_EXCEPTION1,
			"data-exception2": CSS_CLASS_TD_DEFAULT_EXCEPTION2,
			"data-exception3": CSS_CLASS_TD_DEFAULT_EXCEPTION3,
			"data-exception4": CSS_CLASS_TD_DEFAULT_EXCEPTION4,
			"data-exception5": CSS_CLASS_TD_DEFAULT_EXCEPTION5,
			"data-exception6": CSS_CLASS_TD_DEFAULT_EXCEPTION6,
			"data-exception7": CSS_CLASS_TD_DEFAULT_EXCEPTION7,
			"data-exception8": CSS_CLASS_TD_DEFAULT_EXCEPTION8,
			"data-exception9": CSS_CLASS_TD_DEFAULT_EXCEPTION9,
			"data-bold-exception1": CSS_CLASS_TD_DEFAULT_BOLD_EXCEPTION1,
			"data-bold-exception2": CSS_CLASS_TD_DEFAULT_BOLD_EXCEPTION2,
			"data-bold-exception3": CSS_CLASS_TD_DEFAULT_BOLD_EXCEPTION3,
			"data-bold-exception4": CSS_CLASS_TD_DEFAULT_BOLD_EXCEPTION4,
			"data-bold-exception5": CSS_CLASS_TD_DEFAULT_BOLD_EXCEPTION5,
			"data-bold-exception6": CSS_CLASS_TD_DEFAULT_BOLD_EXCEPTION6,
			"data-bold-exception7": CSS_CLASS_TD_DEFAULT_BOLD_EXCEPTION7,
			"data-bold-exception8": CSS_CLASS_TD_DEFAULT_BOLD_EXCEPTION8,
			"data-bold-exception9": CSS_CLASS_TD_DEFAULT_BOLD_EXCEPTION9,
	};

	function renderTable() {
	    that.$().empty();		
		var html = "<table class=\"" + CSS_CLASS_TABLE + "\">";
		for (var iGridRow = 0; iGridRow < iNumGridRows; iGridRow++) {
			html += "<tr class=\"" + CSS_CLASS_TR + "\">";
			for (var iGridCol = 0; iGridCol < iNumGridCols; iGridCol++) {
				if (isCellHiddenBySpan(iGridCol, iGridRow) === false) {
					var sGridType = aGridType[iGridCol][iGridRow];
					var sCssClass = MAP_TYPE_TO_CSS_CLASS[sGridType];

					var iGridColspan = aGridColspan[iGridCol][iGridRow];
					var iGridRowspan = aGridRowspan[iGridCol][iGridRow];
					var sGridText = aGridText[iGridCol][iGridRow];
					var sGridDataAttributes = aGridDataAttributes[iGridCol][iGridRow];

					html += "<td";
					if (sGridDataAttributes) {
						html += " " + sGridDataAttributes;
					}
					html += " class=\"" + sCssClass + "\"";
					if (iGridColspan > 1) {
						html += " colspan=\"" + iGridColspan + "\"";						
					}
					if (iGridRowspan > 1) {
						html += " rowspan=\"" + iGridRowspan + "\"";						
					}
					html += ">";
					html += sGridText;
					html += "</td>";

					iGridCol += iGridColspan - 1; // modest peformance improvement
				}
			}
			html += "</tr>";
		}
	    html += "</table>";
	    that.jqTable = $(html);
	    that.jqTable.click(onCellClick);
	    that.$().append(that.jqTable);		
		
		renderVisualSelection();
	}

	function onCellClick(e) {
		jQuery.each(e.target.attributes, function(index, value) {
			if (value.name.indexOf(DATA_DIM) === 0) { 
				var iDimIndex = parseInt(value.name.substring(DATA_DIM.length), 10);
				var iMemberIndex = parseInt(value.value);
				if (visSelection[iDimIndex] === iMemberIndex) {
					delete visSelection[iDimIndex];
				} else {
					visSelection[iDimIndex] = iMemberIndex;
				}
			}
		});
		that.firePropertiesChangedAndEvent(["visSelection"], "onSelect");	
	}

	function renderVisualSelection() {
		$("." + CSS_CLASS_SELECT_DATA_CELL, jqTable).removeClass(CSS_CLASS_SELECT_DATA_CELL);
		$("." + CSS_CLASS_HOVER_ROW_HEADER_CELL, jqTable).removeClass(CSS_CLASS_HOVER_ROW_HEADER_CELL);
		var sJQuerySelector = "";
		jQuery.each(visSelection, function(index, value) {
			var sLine = "[" + DATA_DIM + index + "=\"" + value + "\"]";
			sJQuerySelector += sLine;
			$("." + CSS_CLASS_HEADER_CELL_DEFAULT + sLine, jqTable).addClass(CSS_CLASS_HOVER_ROW_HEADER_CELL);
		});
		$(sJQuerySelector, jqTable).addClass(CSS_CLASS_SELECT_DATA_CELL);
	}
	
	function findDimensionIndexByName(sDimName) {
		var oDimensions = data.dimensions;
		for (var i = 0; i < oDimensions.length; i++) {
			var sDimNameToCompare = oDimensions[i].key;
			if (sDimName === sDimNameToCompare) {
				return i;
			};
		}
		return -1;
	}

	function findMemberIndexByName(sDimName, sMemberName) {
		var iDimIndex = findDimensionIndexByName(sDimName);
		var oMembers = data.dimensions[iDimIndex].members;
		for (var i = 0; i < oMembers.length; i++) {
			var sMemberNameToCompare = oMembers[i].key;
			if (sMemberName === sMemberNameToCompare) {
				return i;
			};
		}
		return -1;
	}
	
	function countAttributes(oDimension) {
		if (oDimension.attributes) { 
			return oDimension.attributes.length; 
		}
		return 0;
	}
	
	function countAttributeMembers(oMember) {
		if (oMember.attributeMembers) { 
			return oMember.attributeMembers.length; 
		}
		return 0;
	}

	// property setter/getter functions

	this.data = function(value) {
		if (value === undefined) {
			return data;
		} else {
			data = value;
			return this;
		}
	};

	this.visSelection = function(value) {
		if (value === undefined) {
			var oJsonResult = {};
			// map "visSelection", e.g. {0:0, 1:0} -> "jsonResult", e.g. {"0CALYEAR":"2003", "0CALQUART1":"1"}
			jQuery.each(visSelection, function(index, value) {
				var oDim = data.dimensions[index];
				var oMember = oDim.members[value];
				oJsonResult[oDim.key] = oMember.key;
			});
			return JSON.stringify(oJsonResult);
		} else {
			oVisSelection = {};
			if (value !== "") {
				// map "value", e.g. {"0CALYEAR":"2003", "0CALQUART1":"1"} -> "visSelection", e.g. {0:0, 1:0} 
				var oJsonValue = JSON.parse(value);
				for (var sDimName in oJsonValue) {
					if (oJsonValue.hasOwnProperty(sDimName)) {
						var iDimIndex = findDimensionIndexByName(sDimName);
						var iMemberIndex = findMemberIndexByName(sDimName, oJsonValue[sDimName]);
						oVisSelection[iDimIndex] = iMemberIndex;
					}
				}
			}
			return this;
		}
	};
});
