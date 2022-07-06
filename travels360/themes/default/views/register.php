<section style="margin-top:35px">
    <div class="container">
        <div >
            <div class="mx-auto" style="margin-bottom:100px;margin-top100px;width:400px">
                <div class="bt-collapse-wrapper as-toggle" style="margin-bottom:35px">
                    <div class="collapse-item">
                        <div class="collapse-header" id="toggleStyle04-headingOne">
                            <h5 class="collapse-title">
                                <a class="collapse-link" data-toggle="collapse" data-target="#toggleStyle04-collapseOne" aria-expanded="false" aria-controls="toggleStyle04-collapseOne">
                                <?php echo trans('05');?>
                                </a>
                            </h5>
                            <div class="clear"></div>
                        </div>
                        <div id="toggleStyle04-collapseOne" class="collapse show" aria-labelledby="toggleStyle04-headingOne" style="">
                            <div class="collapse-body">
                                <div class="collapse-inner">
                                    <div id="login">
                                        <?php  if(!empty($customerloggedin)){ ?>
                                        <li><a href="<?php echo base_url()?>account/logout"><?php echo trans('03');?></a></li>
                                        <?php }else{ if (strpos($currenturl,'book') !== false) { }else{ ?>
                                        <form action="" method="POST" id="headersignupform">
                                            <div class="clearfix"></div>
                                            <div class="resultsignup"></div>
                                            <div class="form-group">
                                                <label><?php echo trans('090');?></label>
                                                <div class="clear"></div>
                                                <input class="form-control" type="text" placeholder="<?php echo trans('090');?>" name="firstname" value="" required>
                                            </div>
                                            <div class="form-group">
                                                <label><?php echo trans('091');?></label>
                                                <div class="clear"></div>
                                                <input class="form-control" type="text" placeholder="<?php echo trans('091');?>" name="lastname"  value="" required>
                                            </div>
                                            <div class="form-group">
                                                <label><?php echo trans('0173');?></label>
                                                <div class="clear"></div>
                                                <input class="form-control" type="text" placeholder="<?php echo trans('0173');?>" name="phone"  value="" required>
                                            </div>
                                            <div class="form-group">
                                                <label><?php echo trans('094');?></label>
                                                <div class="clear"></div>
                                                <input class="form-control" type="text" placeholder="<?php echo trans('094');?>" name="email"  value="" required>
                                            </div>
                                            <div class="form-group">
                                                <label class="go-right"><?php echo trans('095');?></label>
                                                <input class="form-control" type="password" placeholder="<?php echo trans('095');?>" name="password"  value="" required>
                                            </div>
                                            <div class="form-group">
                                                <label><?php echo trans('096');?></label>
                                                <div class="clear"></div>
                                                <input class="form-control" type="password" placeholder="<?php echo trans('096');?>" name="confirmpassword"  value="" required>
                                            </div>
                                            <div class="form-group">
                                                <button type="submit" class="signupbtn btn_full btn btn-success btn-block btn-lg"><i class="fa fa-check-square-o"></i> <?php echo trans('0115');?></button>
                                            </div>
                                            <?php if(!empty($url)){ ?>
                                            <input type="hidden" class="url" value="<?php echo base_url().'properties/reservation/?'.$url;?>" />
                                            <?php }else{ ?>
                                            <input type="hidden" class="url" value="<?php echo base_url();?>account/" />
                                            <?php } ?>
                                        </form>
                                        <?php } }  ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<script type="text/javascript">
$(function(){
var url = $(".url").val();
// start sign up functionality

$("#headersignupform").submit(function(e) {
 e.preventDefault();
$.post("<?php echo base_url();?>account/signup",$("#headersignupform").serialize(), function(response){
if($.trim(response) == 'true'){
$(".resultsignup").html("<div class='matrialprogress'><div class='indeterminate'></div></div>");
window.location.replace(url);
}else{
$(".resultsignup").html(response); } }); });
// end signup functionality

});

</script>