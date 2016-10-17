module.exports = function(inn) {
	if (inn === this.inn) {
		return `<div class="edit-butt-cont"><span data-company-id="${this.id}" data-element="editCompanyLink" class="edit-butt-elem glyphicon glyphicon-pencil" aria-hidden="true"></span>
		<span data-company-id="${this.id}" data-element="deleteCompanyLink" class="edit-butt-elem glyphicon glyphicon-remove" aria-hidden="true"></span></div>`;
	}

	
};
