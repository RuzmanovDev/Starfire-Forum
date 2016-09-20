import 'jquery'
import Handlebars from 'handlebars'

class TemplateGenerator {
    load(templateName) {
        let templateUrl = `js/templates/${templateName}.handlebars`;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: templateUrl,
                success: function (data) {
                    resolve(Handlebars.compile(data));
                },
                error: function (err) {
                    reject(err);
                }
            })
        });
    }
}

var templateGenerator = new TemplateGenerator();

export {templateGenerator};