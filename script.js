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
}
function numberFormat()
{
    $(document).ready(function() {
        $("#purchase_price").blur(function() {
            var salePrice=$("#purchase_price").val();
            var salePriceRounded= stampPrice.toFixed(2);
            $("#purchase_price").text("$" + stampTaxRounded);
      })
    })
}