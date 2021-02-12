using System.Web;
using System.Web.Optimization;
using BundleTransformer.Core.Builders;
using BundleTransformer.Core.Orderers;
using BundleTransformer.Core.Resolvers;
using BundleTransformer.Core.Transformers;

namespace TestePraticoDesenvolvedorTrainee
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            //bundles.UseCdn = true;

            NullBuilder nullBuilder = new NullBuilder();
            StyleTransformer styleTransformer = new StyleTransformer();
            ScriptTransformer scriptTransformer = new ScriptTransformer();
            NullOrderer nullOrderer = new NullOrderer();

            // Replace a default bundle resolver in order to the debugging HTTP-handler
            // can use transformations of the corresponding bundle
            BundleResolver.Current = new CustomBundleResolver();

            //Styles
            var bundleTemplate = new StyleBundle("~/bundles/Template");
            bundleTemplate.Include("~/Content/Template/theme-default.css",
                                   "~/Content/typeahead.css");
            bundleTemplate.Builder = nullBuilder;
            bundleTemplate.Transforms.Add(styleTransformer);
            bundleTemplate.Orderer = nullOrderer;
            bundles.Add(bundleTemplate);

            var bundleContent = new StyleBundle("~/Content/css");
            bundleContent.Include(
                   "~/Content/bootstrap.min.css",
                   "~/Content/site.css",
                   "~/Content/Template/jquery/jquery-ui.min.css",
                   "~/Content/Template/jquery-confirm/jquery-confirm.min.css");
            bundleContent.Builder = nullBuilder;
            bundleContent.Transforms.Add(styleTransformer);
            bundleContent.Orderer = nullOrderer;
            bundles.Add(bundleContent);

            var bundleJQuery = new ScriptBundle("~/bundles/jquery");
            bundleJQuery.Include(
                    "~/Scripts/jquery-{version}.js");
            bundleJQuery.Builder = nullBuilder;
            bundleJQuery.Transforms.Add(scriptTransformer);
            bundleJQuery.Orderer = nullOrderer;
            bundles.Add(bundleJQuery);

            var TypeHead = new ScriptBundle("~/bundles/TypeHead");
            TypeHead.Include("~/Scripts/typeahead.bundle.min.js",
                             "~/Scripts/bloodhound.min.js",
                             "~/Scripts/bloodhound.js",
                             "~/Scripts/typeahead.mvc.model.js");
            TypeHead.Builder = nullBuilder;
            TypeHead.Transforms.Add(scriptTransformer);
            TypeHead.Orderer = nullOrderer;
            bundles.Add(TypeHead);

            var bundleBootstrap = new ScriptBundle("~/bundles/bootstrap");
            bundleBootstrap.Include(
                     "~/Scripts/bootstrap.min.js",
                     "~/Scripts/respond.min.js");
            bundleBootstrap.Builder = nullBuilder;
            bundleBootstrap.Transforms.Add(scriptTransformer);
            bundleBootstrap.Orderer = nullOrderer;
            bundles.Add(bundleBootstrap);

            var bundleApp = new ScriptBundle("~/bundles/App");
            bundleApp.Include("~/Scripts/Template/plugins/jquery/jquery-ui.min.js",
                              "~/Scripts/Template/plugins/icheck/icheck.min.js",
                              "~/Scripts/Template/plugins/mcustomscrollbar/jquery.mCustomScrollbar.min.js",
                              "~/Scripts/Template/settings.js",
                              "~/Scripts/Template/plugins.js",
                              "~/Scripts/Template/actions.js",
                              "~/Scripts/Template/plugins/noty/jquery.noty.js",
                              "~/Scripts/Template/plugins/noty/layouts/bottomRight.js",
                              "~/Scripts/Template/plugins/noty/layouts/center.js",
                              "~/Scripts/Template/plugins/noty/layouts/top.js",
                              "~/Scripts/Template/plugins/noty/themes/default.js",
                              "~/Scripts/Template/plugins/noty/themes/relax.js",
                              "~/Scripts/Template/plugins/noty/themes/bootstrapTheme.js",
                              "~/Scripts/jquery.mask.js",
                              "~/Scripts/Template/plugins/summernote/summernote.js",
                              "~/Scripts/Template/plugins/bootstrap/bootstrap-datepicker.js",
                              "~/Scripts/Template/plugins/bootstrap/bootstrap-timepicker.min.js",
                              "~/Scripts/Template/plugins/jquery/jquery-ui.min.js",
                              "~/Scripts/Template/plugins/owl/owl.carousel.min.js",
                              "~/Scripts/Template/plugins/treeview/tree-custom.min.js",
                              "~/Scripts/Template/plugins/datatables/jquery.dataTables.min.js",
                              "~/Scripts/Template/plugins/tableexport/tableExport.js",
                              "~/Scripts/Template/plugins/tableexport/jquery.base64.js",
                              "~/Scripts/Template/plugins/datatables/dataTables.fixedColumns.min.js",
                              "~/Scripts/TestePratico.js",
                              "~/Scripts/Template/plugins/bootstrap/bootstrap-select.js",
                              "~/Scripts/Template/plugins/morris/raphael-min.js",
                              "~/Scripts/Template/plugins/morris/morris.min.js",
                              "~/Scripts/maskMoney/jquery.maskMoney.js",
                              "~/Scripts/Template/plugins/jquery-confirm/jquery-confirm.min.js");
            bundleApp.Builder = nullBuilder;
            bundleApp.Transforms.Add(scriptTransformer);
            bundleApp.Orderer = nullOrderer;
            bundles.Add(bundleApp);

            //bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
            //            "~/Scripts/jquery.validate*"));

            //bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
            //            "~/Scripts/jquery-{version}.js"));

            //bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
            //            "~/Scripts/jquery.validate*"));

            // Use a versão em desenvolvimento do Modernizr para desenvolver e aprender. Em seguida, quando estiver
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            //bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
            //          "~/Scripts/bootstrap.js",
            //          "~/Scripts/respond.js"));

            //bundles.Add(new StyleBundle("~/Content/css").Include(
            //          "~/Content/bootstrap.css",
            //          "~/Content/site.css"));
        }
    }
}