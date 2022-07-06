<?php //dd($toursearch['ToursSearchForm']->from_code);?>
<style>
    .form-control{
        overflow:hidden;
        -webkit-appearance:none;
    }
</style>
<div class="ftab-inner menu-horizontal-content">
    <div class="form-search-main-01">
        <form autocomplete="off" action="<?php echo base_url()?>viator/search" method="get" role="search">
            <div class="form-inner">
                <div class="row gap-10 mb-15 align-items-end">
                    <div class="col-md-3 col-xs-12">
                        <div class="form-group">
                            <label><?=lang('0120')?></label>
                            <div class="clear"></div>
                            <div class="form-icon-left typeahead__container">
                                <span class="icon-font text-muted"><i class="bx bx-map"></i></span>
                                <!-- id = textsearch is used to get data in jquery script -->
                                <input type="text" name="location" id="textsearch" data-module="<?php echo $module; ?>" class="form-control hotelsearch locationlist<?php echo $module; ?>" placeholder="<?php if ($module == 'hotels') { echo trans('026'); } elseif ($module == 'tours') { echo trans('0526'); } ?>" value="<?php echo $toursearch['ToursSearchForm']->from_code; ?>" required>
                                <input type="hidden" id="txtsearch" name="txtSearch" value="<?php echo $toursearch['ToursSearchForm']->from_code; ?>">
                            </div>
                        </div>
                    </div>
                    <!--Starting Date-->
                    <div class="col-md-3 col-xs-12">
                        <div class="col-inner">
                            <div class="row gap-10 mb-15">
                                <div class="col-md-12">
                                    <div class="col-inner">
                                        <div class="form-people-thread">
                                            <div class="row gap-5 align-items-center">
                                                <div id="airDatepickerRange-hotel" class="col">
                                                    <div class="form-group form-spin-group">
                                                        <label for="room-amount"><?php echo trans('08');?></label>
                                                        <div class="clear"></div>
                                                        <div class="form-icon-left">
                                                            <span class="icon-font text-muted"><i class="bx bx-calendar"></i></span>
                                                            <input type="text" id="DateTours" class="DateTours form-control form-readonly-control" placeholder="dd/mm/yyyy" value="<?=$toursearch['ToursSearchForm']->checkin?>" name="startDate" required>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--Ending Date-->
                    <div class="col-md-3 col-xs-12">
                        <div class="col-inner">
                            <div class="row gap-10 mb-15">
                                <div class="col-md-12">
                                    <div class="col-inner">
                                        <div class="form-people-thread">
                                            <div class="row gap-5 align-items-center">
                                                <div id="airDatepickerRange-hotel" class="col">
                                                    <div class="form-group form-spin-group">
                                                        <label for="room-amount"><?php echo trans('08');?></label>
                                                        <div class="clear"></div>
                                                        <div class="form-icon-left">
                                                            <span class="icon-font text-muted"><i class="bx bx-calendar"></i></span>
                                                            <input type="text" id="EndDateTours" class="DateTours form-control form-readonly-control" placeholder="dd/mm/yyyy" value="<?=$toursearch['ToursSearchForm']->checkin?>" name="endDate" required>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 col-xs-12">
                        <input type="hidden" name="module_type"/>
                        <input type="hidden" name="slug"/>
                        <button type="submit"  class="btn btn-primary btn-block"><i class="icon_set_1_icon-66"></i> <?php echo trans('012'); ?></button>
                    </div>
                </div>
            </div>
            <input type="hidden" name="searching" class="searching" value="<?php echo $_GET['searching']; ?>">
            <input type="hidden" class="modType" name="modType" value="<?php echo $_GET['modType']; ?>">
            <script>
                $(function () {
                    $(".locationlist<?php echo $module; ?>").select2({
                        width: '100%',
                        allowClear: true,
                        maximumSelectionSize: 1,
                        placeholder: "Start typing",
                        data: JSON.parse('<?=$data['defaultToursListForSearchField']?>'),
                        initSelection: function (element, callback) {
                            callback({id: 1, text: '<?=(!empty($toursearch['ToursSearchForm']->from_code))? $toursearch['ToursSearchForm']->from_code :lang('0526'); ?>'})
                        }
                    });

                    $(".locationlist<?php echo $module; ?>").on("select2-open",
                        function (e) {
                            $(".select2-drop-mask");
                            $(".formSection").trigger("click")
                        });
                    $(".locationlist<?php echo $module; ?>").on("select2-selecting", function (e) {
                        $(".modType").val(e.object.module);
                        $(".searching").val(e.object.id);
                        $("#txtsearch").val(e.object.text);
                    })
                })
            </script>
                <script>
                    $("form").submit(function ( event ) {
                        event.preventDefault();
                        var textsearch = $("#textsearch").val();
                        var startDate = $("#DateTours").val().replace(/\//g,"-");
                        var endDate = $("#EndDateTours").val().replace(/\//g,"-");
                        var arr = [textsearch,startDate,endDate];

                        window.location.href = base_url + 'viator/search/' + arr.join("/");

                        // var root = base_url + 'vtour/' + $("#textsearch").val() + "/" + startDate + "/" + endDate;
                        // alert(root);
                    });
                </script>
        </form>
    </div>
</div>

<!------------------------------------------------------------------->
<!-- ********************    TOURS MODULE    ********************  -->
<!------------------------------------------------------------------->