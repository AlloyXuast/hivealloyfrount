import React, { Component } from 'react';
import { connect } from 'react-redux';

class PromotedMember extends Component {
    render() {
        const { promoted_member, author } = this.props; // redux

        const promoted = promoted_member.get(author);
        
        let staff = '';
        let developer = '';
        let witness = '';
        let contentcreator = '';
        let officialblurtdevs = '';
        let patreontag = '';
        let promotedtag = '';

        if (promoted !== undefined) {
            
            const description = `@${promoted.category}: ${promoted.description}`;
            
            if (promoted.isStaff == true) {
                staff = {"css": `StaffMember`, "desc": `${description}`, "title": `STAFF`};
            }
            
            if (promoted.isWitness == true) {
                witness = {"css": `WitnessMember`, "desc": `${description}`, "title": `WITNESS`};
            }
            
            if (promoted.isDev == true) {
                developer = {"css": `DevMember`, "desc": `${description}`, "title": `ALLOY DEV`};
            }
            
            if (promoted.isContentCreator == true) {
                contentcreator = {"css": `CCMember`, "desc": `${description}`, "title": `CONTENT CREATOR`};
            }
            
            if (promoted.isOfficialBlurtDev == true) {
                officialblurtdevs = {"css": `DevMember`, "desc": `${description}`, "title": `BLURT DEV`};
            }

            if (promoted.isPromoted == true) {
                promotedtag = {"css": `PromotedMember`, "desc": `${description}`, "title": `Promoted`};
            }

            if (promoted.patreon.isActive == true) {
                if (promoted.patreon.tier == "DONATOR") {
                    var cssname = "PatreonDonator";
                } else if (promoted.patreon.tier == "PREMIUM") {
                    var cssname = "PatreonPremium";
                } else if (promoted.patreon.tier == "LEGEND") {
                    var cssname = "PatreonLegend";
                } else if (promoted.patreon.tier == "MEGA") {
                    var cssname = "PatreonMEGA";
                }

                patreontag = {"css": cssname, "desc": `${description}`, "title": `Patreon: ${promoted.patreon.tier}`};
            }
            
            const putalltogether = [staff,witness,developer,contentcreator,officialblurtdevs,promotedtag,patreontag];
            
            const listItems = putalltogether.map((d) => <span className={d.css} title={d.desc}>{d.title}</span>);
        
            return (
                <div>
                {listItems}
                </div>
            );
        }
        return null;
    }
}

export default connect((state) => {
    const promoted_member =
        state.global.getIn(['promoted_members']) == undefined
            ? undefined
            : state.global.getIn(['promoted_members']);
    return {
        promoted_member
    };
})(PromotedMember);
