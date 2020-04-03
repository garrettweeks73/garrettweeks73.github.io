$(document).ready(function() {
    $("#menu li a").on('click', function(e) {
        e.preventDefault();
        var page = $(this).data('page');
        $("#pages .page:not('.hide')").stop().fadeOut('fast', function() {
            $(this).addClass('hide');
          $('#pages .page[data-page="'+page+'"]').fadeIn('slow').removeClass('hide');
      })
  })
})
{
$(document).ready(function () {
    $("#purchase_price").bind('change',function () { 
        $(this).val(function(i, v) { return parseFloat(v).toFixed(2); });
    });
});
function stampTaxCalc()
{
    $(document).ready(function() {
        $("#calculate").click(function() {
            var salePrice=$("#purchase_price").val();
            var salePriceParse= salePrice / 500;
            var saleParseWhole=Math.ceil(salePriceParse);
            var stampTax= saleParseWhole * 0.75;
            var stampTaxRounded= stampTax.toFixed(2);
            $("#stampTax").text("$" + stampTaxRounded);
      })
    })
}}